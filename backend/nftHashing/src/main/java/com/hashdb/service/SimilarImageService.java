package com.hashdb.service;

import java.util.List;

import com.hashdb.entities.NFT;

public interface SimilarImageService {

	public List<NFT> findSimilarImage(String tokenId,String contractAddress,String chain);
}
