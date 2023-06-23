package com.hashdb.controller;

import java.util.UUID;

import lombok.Data;

@Data
public class SimilarNft {
	private UUID id;
	private String nftId;
	private String imageOriginalUrl;
	private String tokenId;
	private String address;
	private String tokenMetadata;

	public SimilarNft(UUID id, String nftId, String imageOriginalUrl, String tokenId, String address,
			String tokenMetadata) {
		this.id = id;
		this.nftId = nftId;
		this.imageOriginalUrl = imageOriginalUrl;
		this.tokenId = tokenId;
		this.address = address;
		this.tokenMetadata = tokenMetadata;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getNftId() {
		return nftId;
	}

	public void setNftId(String nftId) {
		this.nftId = nftId;
	}

	public String getImageOriginalUrl() {
		return imageOriginalUrl;
	}

	public void setImageOriginalUrl(String imageOriginalUrl) {
		this.imageOriginalUrl = imageOriginalUrl;
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

	public String getTokenMetadata() {
		return tokenMetadata;
	}

	public void setTokenMetadata(String tokenMetadata) {
		this.tokenMetadata = tokenMetadata;
	}

	@Override
	public String toString() {
		return "SimilarNft [id=" + id + ", nftId=" + nftId + ", imageOriginalUrl=" + imageOriginalUrl + ", tokenId="
				+ tokenId + ", address=" + address + ", tokenMetadata=" + tokenMetadata + "]";
	}

}
