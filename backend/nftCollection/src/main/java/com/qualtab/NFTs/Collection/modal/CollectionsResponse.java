package com.qualtab.NFTs.Collection.modal;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CollectionsResponse {
	@JsonProperty("next")
	private String next;
	
	@JsonProperty("collections")
	private List<CollectionId> collections;

	
}