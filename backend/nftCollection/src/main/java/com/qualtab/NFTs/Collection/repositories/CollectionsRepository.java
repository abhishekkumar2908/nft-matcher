package com.qualtab.NFTs.Collection.repositories;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.qualtab.NFTs.Collection.modal.Collections;

@Repository
public interface CollectionsRepository extends MongoRepository<Collections, UUID> {

	Collections findFirstByOrderByCreatedDateDesc();

}