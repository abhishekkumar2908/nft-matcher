package com.qualtab.NFTs.Collection.entities.simpleHash;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SimpleHashNftResponse {

	private String next_cursor;
	private String next;
	private String previous;
	private List<SimpleNft> nfts;
}
