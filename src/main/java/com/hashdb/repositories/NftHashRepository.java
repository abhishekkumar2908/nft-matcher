package com.hashdb.repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hashdb.entities.NftHash;

@Repository
public interface NftHashRepository extends MongoRepository<NftHash, UUID> {

	NftHash findFirstByOrderByNftIdDesc();
}
