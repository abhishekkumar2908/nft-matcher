package com.hashdb.service;

import java.util.List;

import com.hashdb.controller.SimilarNft;
import com.hashdb.entities.NFT;

public interface SimilarImageService {

	public List<SimilarNft> findSimilarImage(String tokenId,String contractAddress,String chain);
	
	public List<NFT> findAllNts(int limit,int page);
}
