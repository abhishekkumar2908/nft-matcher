package com.hashdb.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hashdb.entities.NFT;

@Repository
public interface NftRepository extends MongoRepository<NFT, UUID> {

	List<NFT> findByIsHashedAndProvider(boolean isHashed, String provider);
	
	Optional<NFT> findByNftId(String nftId);

	NFT findByTokenIdAndAddressAndProvider(String tokenId,String address,String provider);
}
