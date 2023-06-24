package com.hashdb.entities;

import java.math.BigInteger;
import java.util.UUID;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class NftHash {

	@Id
	private UUID id;
	private String nftId;
	private BigInteger hashValue;
	private int len;
	private int algorithmId;
	private long createdDate;
 

}
