package com.qualtab.NFTs.Collection.services;

import java.io.IOException;


public interface OpenSeaApiService {
	//void syncOpenSeaNFTs() throws IOException, InterruptedException;

	void syncOpenSeaNFTs(String prevValue) throws IOException, InterruptedException;

	String loadPrevValue();
}
