package com.qualtab.NFTs.Collection.entities.simpleHash;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SimpleHashCollectionId {
	private String collection_id;

}
