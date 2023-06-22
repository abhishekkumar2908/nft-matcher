package com.hashdb.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hashdb.entities.NFT;

@Repository
public interface NftRepository extends MongoRepository<NFT, UUID> {

	List<NFT> findByNftIdGreaterThanOrderByNftIdAsc(int lastHashedNftId);
	Optional<NFT> findByNftId(int nftId);

	List<NFT> findByTokenIdAndAddress(String tokenId,String address);
}
