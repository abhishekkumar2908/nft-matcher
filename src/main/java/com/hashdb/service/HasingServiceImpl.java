package com.hashdb.service;

import java.awt.image.BufferedImage;
import java.io.IOException;
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
        NftHash lastHashedNft = nftHashRepository.findFirstByOrderByNftIdDesc();
        int lastHashedNftId = lastHashedNft != null ? lastHashedNft.getNftId() : 0;

        List<NFT> nftList = nftRepository.findByNftIdGreaterThanOrderByNftIdAsc(lastHashedNftId);
        System.out.println("Starting from " + lastHashedNftId + "\n");

        ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
        List<CompletableFuture<Void>> futures = nftList.stream().map(nft -> CompletableFuture.runAsync(() -> {
            try {
                if (!(nft.getImageOriginalUrl().endsWith(".mp4") || nft.getImageOriginalUrl().endsWith(".mov"))) {
                    URL imageUrl = new URL(nft.getImageOriginalUrl());
                    System.out.println(nft.getImageOriginalUrl() + " incoming");

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
                        nftHash.setNftId(nft.getNftId());
                        nftHash.setHashValue(imgHash.getHashValue());
                        nftHash.setLen(imgHash.getHashValue().bitLength());
                        nftHash.setAlgorithmId(imgHash.getAlgorithmId());
                        nftHash.setCreatedDate(new Date().getTime());

                        nftHashRepository.save(nftHash);
                        System.out.println(imageUrl + " having id " + nftHash.getNftId() + " saved.");
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
}
