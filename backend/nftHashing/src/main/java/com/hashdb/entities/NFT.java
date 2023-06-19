package com.hashdb.entities;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "nft")
public class NFT {

	@Id
	private UUID id;

	private Integer nftId;
	private String imageOriginalUrl;
	private Integer tokenId;
	private String address;
	private String tokenMetadata;
	private String next;
	private String previous;
	private String provider;

	public String getImageOriginalUrl() {
		return imageOriginalUrl;
	}

	public void setImageOriginalUrl(String imageOriginalUrl) {
		this.imageOriginalUrl = imageOriginalUrl;
	}
	public Integer getTokenId() {
		return tokenId;
	}

	public void setTokenId(Integer tokenId) {
		this.tokenId = tokenId;
	}
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	public String getTokenMetadata() {
		return tokenMetadata;
	}

	public void setTokenMetadata(String tokenMetadata) {
		this.tokenMetadata = tokenMetadata;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Integer getNftId() {
		return nftId;
	}

	public void setNftId(Integer nftId) {
		this.nftId = nftId;
	}

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

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}
	
	public NFT orElseGetNull() {
        return Optional.ofNullable(this).orElse(null);
    }

	@Override
	public String toString() {
		return "NFT [id=" + id + ", nftId=" + nftId + ", imageOriginalUrl=" + imageOriginalUrl + ", tokenMetadata="
				+ tokenMetadata + ", next=" + next + ", previous=" + previous + ", provider=" + provider + "]";
	}

	

}
