package com.qualtab.NFTs.Collection.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CollectionId {

	@JsonProperty("collection_id")
	private String collectionId;
	
}
	