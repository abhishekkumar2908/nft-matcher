package com.hashdb.controller;

import java.util.UUID;

import lombok.Data;

@Data
public class SimilarNft {
    private UUID id;
    private Integer nftId;
    private String imageOriginalUrl;
    private Integer tokenId;
    private String address;
    private String tokenMetadata;

    public SimilarNft(UUID id, Integer nftId, String imageOriginalUrl, Integer tokenId, String address, String tokenMetadata) {
        this.id = id;
        this.nftId = nftId;
        this.imageOriginalUrl = imageOriginalUrl;
        this.tokenId = tokenId;
        this.address = address;
        this.tokenMetadata = tokenMetadata;
    }
}
