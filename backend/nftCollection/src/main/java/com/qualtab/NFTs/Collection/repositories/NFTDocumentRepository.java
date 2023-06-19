package com.qualtab.NFTs.Collection.repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import mongo.NFTDocument;

@Repository
public interface NFTDocumentRepository extends MongoRepository<NFTDocument, UUID> {

	NFTDocument findFirstByOrderByNftIdDesc();

}
