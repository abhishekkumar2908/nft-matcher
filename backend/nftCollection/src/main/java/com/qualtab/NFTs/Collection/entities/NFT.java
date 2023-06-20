package com.qualtab.NFTs.Collection.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class NFT {

	@JsonProperty("id")
	private Integer id;
	
	@JsonProperty("next")
	private String next;
	
	@JsonProperty("previous")
	private String previous;
	
	@JsonProperty("image_original_url")
	private String imageOriginalUrl;
	
	@JsonProperty("token_metadata")
	private String tokenMetadata;
		
	@JsonProperty("token_id")
	private String tokenId;
	
	@JsonProperty("address")
	private String address;
	
	@JsonProperty("asset_contract")
	private AssetContract assetContract;

	public String getNext() {
		return next;
	}

	public void setNext(String next) {
		this.next = next;
	}

	public String getPrevious() {
		return previous;
	}

	public void setPrevious(String previous) {
		this.previous = previous;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getImageOriginalUrl() {
		return imageOriginalUrl;
	}

	public void setImageOriginalUrl(String imageOriginalUrl) {
		this.imageOriginalUrl = imageOriginalUrl;
	}
	public String getTokenMetadata() {
		return tokenMetadata;
	}

	public void setTokenMetadata(String tokenMetadata) {
		this.tokenMetadata = tokenMetadata;
	}

	public String getTokenId() {
		return tokenId;
	}

	public void setTokenId(String tokenId) {
		this.tokenId = tokenId;
	}
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	public AssetContract getAssetContract() {
        return assetContract;
    }
//	@JsonProperty("is_nsfw")
//	private Boolean isNsfw;
//	
//	@JsonProperty("owner")
//	private Object owner;
//	
//	@JsonProperty("listing_date")
//	private Object listingDate;

	
	
//	@JsonProperty("creator")
//	private Creator creator;
//	@JsonProperty("traits")
//	private List<Object> traits;
//	@JsonProperty("last_sale")
//	private Object lastSale;
//	@JsonProperty("top_bid")
//	private Object topBid;
	
	
	
	
	

	// Add getters and setters
}
