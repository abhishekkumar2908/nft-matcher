package com.hashdb.service;

import java.util.List;

import com.hashdb.controller.SimilarNft;

public interface SimilarImageService {

	public List<SimilarNft> findSimilarImage(String tokenId,String contractAddress,String chain);
}
