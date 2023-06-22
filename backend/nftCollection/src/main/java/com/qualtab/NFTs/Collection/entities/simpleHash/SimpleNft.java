package com.qualtab.NFTs.Collection.entities.simpleHash;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SimpleNft {
	
	private String nft_id;
	private String chain;
	private String contract_address;
	private String token_id;
	private String name;
	private String image_url;
	private SimpleHashMetadata extra_metadata;
	private SimpleHashCollectionId collection;
	

}
