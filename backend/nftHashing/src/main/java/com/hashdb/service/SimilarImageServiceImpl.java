package com.hashdb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hashdb.entities.NFT;
import com.hashdb.repositories.NftRepository;

@Service
public class SimilarImageServiceImpl implements SimilarImageService {
	
	@Autowired
	NftRepository nftRepository;

	@Override
	public List<NFT> findSimilarImage(String tokenId, String contractAddress) {
		return nftRepository.findByTokenIdAndAddress(tokenId, contractAddress);
	}

}
