package com.hashdb.entities;

import java.math.BigInteger;
import java.util.UUID;

import org.springframework.data.annotation.Id;

public class NftHash {

	@Id
	private UUID id;
	private Integer nftId;
	private BigInteger hashValue;
	private int len;
	private int algorithmId;
	private long createdDate;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Integer getNftId() {
		return nftId;
	}	

	public void setNftId(Integer integer) {
		this.nftId = integer;
	}

	public BigInteger getHashValue() {
		return hashValue;
	}

	public void setHashValue(BigInteger hashValue) {
		this.hashValue = hashValue;
	}

	public int getLen() {
		return len;
	}

	public void setLen(int len) {
		this.len = len;
	}

	public int getAlgorithmId() {
		return algorithmId;
	}

	public void setAlgorithmId(int algorithmId) {
		this.algorithmId = algorithmId;
	}

	public long getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(long createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "NftHash [id=" + id + ", nftId=" + nftId + ", hashValue=" + hashValue + ", len=" + len + ", algorithmId="
				+ algorithmId + ", createdDate=" + createdDate + "]";
	}

}
