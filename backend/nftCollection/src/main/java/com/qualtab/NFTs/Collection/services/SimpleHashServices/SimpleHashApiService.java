package com.qualtab.NFTs.Collection.services.SimpleHashServices;

import java.io.IOException;


public interface SimpleHashApiService {
	//void syncOpenSeaNFTs() throws IOException, InterruptedException;

	void syncNFTs(String prevValue) throws IOException, InterruptedException;

	String loadPrevCursor();
}
