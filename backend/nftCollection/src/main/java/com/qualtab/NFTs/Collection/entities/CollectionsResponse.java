package com.qualtab.NFTs.Collection.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CollectionsResponse {
	@JsonProperty("next_cursor")
	private String nextCursor;
	
	@JsonProperty("previous")
	private String privious;
	
	@JsonProperty("collections")
	private List<CollectionId> collections;

	
}