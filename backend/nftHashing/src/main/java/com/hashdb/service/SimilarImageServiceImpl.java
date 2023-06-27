package com.hashdb.service;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.apache.batik.transcoder.TranscoderException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.hashdb.config.IPFSConfig;
import com.hashdb.controller.SimilarNft;
import com.hashdb.entities.NFT;
import com.hashdb.entities.NftHash;
import com.hashdb.repositories.NftHashRepository;
import com.hashdb.repositories.NftRepository;
import com.hashdb.util.HashingUtility;
import com.hashdb.util.convertToPng;

import dev.brachtendorf.jimagehash.hash.Hash;

@Service
public class SimilarImageServiceImpl implements SimilarImageService {
	
	@Autowired
	NftRepository nftRepository;
	
	@Autowired
	NftHashRepository nftHashRepository;
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	@Override
	public List<SimilarNft> findSimilarImage(String tokenId, String contractAddress,String chain) {
		
		try {
		
		NFT nft = nftRepository.findByTokenIdAndAddressAndProvider(tokenId, contractAddress,chain);
		
//		NftHash hash = nftHashRepository.findByNftId(nft.getNftId());
		
		URL imageUrl = null;
		System.out.println(nft.getImageOriginalUrl());
		if (nft.getImageOriginalUrl().contains("ipfs://")) {
			imageUrl = getIpfsUrls(nft.getImageOriginalUrl());
		}else {
			imageUrl= new URL(nft.getImageOriginalUrl());
		}

		BufferedImage hashImage = null;
		if (nft.getImageOriginalUrl().endsWith(".svg")) {
			hashImage = convertToPng.readThis1(imageUrl);
//            convertToPng.saveImage(hashImage, "/home/qualtab/Desktop/sssssvg");
		} else {
			hashImage = ImageIO.read(imageUrl);
		}

		Hash hash = HashingUtility.hashImage(hashImage);
		
		
		List<String> matchedNFTs = nftHashRepository.findAll().stream().filter(nftHash -> {
			double similarityScore = (hash.getHashValue().xor(nftHash.getHashValue()).bitCount())
					/ (double) nftHash.getLen();
			return similarityScore < 0.190;
		}).map(NftHash::getNftId).filter(Objects::nonNull).collect(Collectors.toList());
		List<SimilarNft> similarNFTs = matchedNFTs.stream().map((String nftId) -> {
			Optional<NFT> optionalNft = nftRepository.findByNftId(nftId);
			if (optionalNft.isPresent()) {
				NFT nftObj = optionalNft.get();
//		        	            similarNft.Set
				return new SimilarNft(nftObj.getId(), nftObj.getNftId(), nftObj.getImageOriginalUrl(), nftObj.getTokenId(),
						nftObj.getAddress(), nftObj.getTokenMetadata());
			}
			return null;
		}).filter(Objects::nonNull).collect(Collectors.toList());
		
		
//		return nftRepository.findByTokenIdAndAddressAndProvider(tokenId, contractAddress,chain);
		
		return similarNFTs;
		
		}catch(IOException io) {
			io.printStackTrace();
		} catch (TranscoderException e) {
			e.printStackTrace();
		}
		return new ArrayList<SimilarNft>();
	}

	@Override
	public List<NFT> findAllNts(int limit, int page) {
		
		PageRequest pageRequest = PageRequest.of(page, limit);
		Query query=new Query().with(pageRequest);
		List<NFT> nftList =  mongoTemplate.find(query, NFT.class);
		return nftList;
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

}
