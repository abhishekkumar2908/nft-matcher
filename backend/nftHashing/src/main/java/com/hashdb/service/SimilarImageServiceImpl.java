package com.hashdb.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hashdb.controller.SimilarNft;
import com.hashdb.entities.NFT;
import com.hashdb.entities.NftHash;
import com.hashdb.repositories.NftHashRepository;
import com.hashdb.repositories.NftRepository;

@Service
public class SimilarImageServiceImpl implements SimilarImageService {
	
	@Autowired
	NftRepository nftRepository;
	
	@Autowired
	NftHashRepository nftHashRepository;

	@Override
	public List<SimilarNft> findSimilarImage(String tokenId, String contractAddress,String chain) {
		
		NFT nft = nftRepository.findByTokenIdAndAddressAndProvider(tokenId, contractAddress,chain);
		
		NftHash hash = nftHashRepository.findByNftId(nft.getNftId());
		
		
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
	}

}
