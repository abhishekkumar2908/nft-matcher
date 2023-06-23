package com.hashdb.entities;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "nFTDocument")
public class NFT {

	@Id
	private UUID id;
	private String collectionId;
	private String nftId;
	private String imageOriginalUrl;
	private String tokenMetadata;
	private String tokenId;
	private String address;
	private String next;
	private String previous;
	private String provider;
	private boolean isHashed;
	
	
	

}
