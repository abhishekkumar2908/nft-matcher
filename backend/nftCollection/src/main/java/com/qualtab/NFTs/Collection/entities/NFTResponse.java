package com.qualtab.NFTs.Collection.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class NFTResponse {

	@JsonProperty("next")
	private String next;

	@JsonProperty("previous")
	private String previous;

	@JsonProperty("assets")
	private List<NFT> assets;
	
	@JsonProperty("token_id")
	private String tokenId;
	
	@JsonProperty("address")
	private String address;

	public List<NFT> getAssets() {
		return this.assets;
	}

	public String getNext() {
		return this.next;
	}
	public String getPrev() {
		return this.previous;
	}
	
	public String getTokenId() {
		return this.tokenId;
	}
	public String getAddress() {
		return this.address;
	}
	
	

}
