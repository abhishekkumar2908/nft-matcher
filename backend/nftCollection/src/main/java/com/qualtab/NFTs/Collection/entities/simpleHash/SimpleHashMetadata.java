package com.qualtab.NFTs.Collection.entities.simpleHash;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SimpleHashMetadata {
	
	private String metadata_original_url;

}
