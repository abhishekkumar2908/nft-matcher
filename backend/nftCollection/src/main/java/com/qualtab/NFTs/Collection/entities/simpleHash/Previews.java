package com.qualtab.NFTs.Collection.entities.simpleHash;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Previews {

	private String image_small_url;
	private String image_medium_url;
	private String image_large_url;
		
}
