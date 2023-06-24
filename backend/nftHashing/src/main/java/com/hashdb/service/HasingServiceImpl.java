package com.hashdb.service;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.apache.batik.transcoder.TranscoderException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.hashdb.config.IPFSConfig;
import com.hashdb.entities.NFT;
import com.hashdb.entities.NftHash;
import com.hashdb.repositories.NftHashRepository;
import com.hashdb.repositories.NftRepository;
import com.hashdb.util.HashingUtility;
import com.hashdb.util.convertToPng;

import dev.brachtendorf.jimagehash.hash.Hash;

@Service
public class HasingServiceImpl implements HasingService {

	@Autowired
	NftRepository nftRepository;

	@Autowired
	NftHashRepository nftHashRepository;

	@Override
	public void storeHashOfNFT() {
//		NftHash lastHashedNft = nftHashRepository.findFirstByOrderByNftIdDesc();
//		String lastHashedNftId = lastHashedNft != null ? lastHashedNft.getNftId() : "0";

		List<NFT> nftList = nftRepository.findByIsHashedAndProvider(false, "ethereum");
//		System.out.println("Starting from " + lastHashedNftId + "\n");

		ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
		List<CompletableFuture<Void>> futures = nftList.stream().map(nft -> CompletableFuture.runAsync(() -> {
			try {
				if (!(nft.getImageOriginalUrl().endsWith(".mp4") || nft.getImageOriginalUrl().endsWith(".mov"))) {

					URL imageUrl = null;
					System.out.println(nft.getImageOriginalUrl());
					if (nft.getImageOriginalUrl().contains("ipfs://")) {
						imageUrl = getIpfsUrls(nft.getImageOriginalUrl());
					}

					BufferedImage hashImage = null;
					if (nft.getImageOriginalUrl().endsWith(".svg")) {
						hashImage = convertToPng.readThis1(imageUrl);
//                        convertToPng.saveImage(hashImage, "/home/qualtab/Desktop/sssssvg");
					} else {
						hashImage = ImageIO.read(imageUrl);
					}

					if (hashImage != null) {
						Hash imgHash = HashingUtility.hashImage(hashImage);
						NftHash nftHash = new NftHash();
						nftHash.setId(UUID.randomUUID());
						nftHash.setNftId(String.valueOf(nft.getNftId()));
						nftHash.setHashValue(imgHash.getHashValue());
						nftHash.setLen(imgHash.getHashValue().bitLength());
						nftHash.setAlgorithmId(imgHash.getAlgorithmId());
						nftHash.setCreatedDate(new Date().getTime());

						nftHashRepository.save(nftHash);
						System.out.println(imageUrl + " having id " + nftHash.getNftId() + " saved.");
						
						// set isHashed as true
						nft.setHashed(true);
						nftRepository.save(nft);
					}
				} else {
					System.out.println(nft.getImageOriginalUrl() + " not saved");
				}
			} catch (IOException | TranscoderException e) {
				e.printStackTrace();
			}
		}, executorService)).collect(Collectors.toList());

		CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
		executorService.shutdown();
	}

	public URL getIpfsUrls(String imageURL) {
		URL imageUrl = null;
		try {
			String mainImage = null;
			if (imageURL.startsWith("ipfs://")) {
				mainImage = imageURL.replace("ipfs://", "");
			} else {
				mainImage = imageURL.replace("https://ipfs.io/ipfs/", "");
			}

			for (String gateways : IPFSConfig.getIpfsUrls()) {
				String imageVal = gateways + mainImage;
				System.out.println(imageVal);
				imageUrl = new URL(imageVal);
				Image image = null;
				try {

					image = ImageIO.read(imageUrl);
				} catch (IOException e) {

				}
				if (!ObjectUtils.isEmpty(image) && image.getWidth(null) != -1) {
					System.out.println("image is Working");
					return imageUrl;
				}
			}

		} catch (MalformedURLException e) {
			e.printStackTrace();
		}

		return imageUrl;

	}

	public static void main(String[] args) {
		HasingServiceImpl h = new HasingServiceImpl();
		URL url = h.getIpfsUrls("https://ipfs.io/ipfs/QmRpjXNxcPk8UXq6qKhgRDC3s7wiUEg48dqKfdT5JP4Lh9/nft.png");
		System.out.println(url);

//		https://ipfs.io/ipfs/QmRpjXNxcPk8UXq6qKhgRDC3s7wiUEg48dqKfdT5JP4Lh9/nft.png
	}
}
