package com.qualtab.NFTs.Collection.repositories;
import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.qualtab.NFTs.Collection.entities.Collection;

@Repository
public interface CollectionsRepository extends MongoRepository<Collection, UUID> {

	Collection findFirstByOrderByCreatedDateDesc();
	
	Collection findByCollectionId(String collectionId);
	
	List<Collection> findByChain(String chainName);

}