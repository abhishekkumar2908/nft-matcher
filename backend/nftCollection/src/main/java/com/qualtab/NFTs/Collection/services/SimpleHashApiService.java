package com.qualtab.NFTs.Collection.services;

import java.io.IOException;


public interface SimpleHashApiService {
	//void syncOpenSeaNFTs() throws IOException, InterruptedException;

	void syncAvalancheFujiNFTs(String prevValue) throws IOException, InterruptedException;

	String loadPrevValue();
}
