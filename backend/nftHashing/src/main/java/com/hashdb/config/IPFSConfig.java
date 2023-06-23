package com.hashdb.config;

import java.util.ArrayList;
import java.util.List;

public class IPFSConfig {

	
	public static List<String> getIpfsUrls(){
		List<String> ipfsUrl = new  ArrayList<>();
		
		ipfsUrl.add("https://ipfs.io/ipfs/");
		ipfsUrl.add("https://gateway.ipfs.io/ipfs/");
		ipfsUrl.add("https://gateway.pinata.cloud/ipfs/");
		ipfsUrl.add("https://dweb.link/ipfs/");
		ipfsUrl.add("https://ipfs.best-practice.se/ipfs/");
		ipfsUrl.add("https://jorropo.net/ipfs/");
		ipfsUrl.add("https://via0.com/ipfs/");
		ipfsUrl.add("https://ipfs.runfission.com/ipfs/");
		ipfsUrl.add("https://cloudflare-ipfs.com/ipfs/");
		ipfsUrl.add("https://cf-ipfs.com/ipfs/");
		ipfsUrl.add("https://ipfs.litnet.work/ipfs/");
		ipfsUrl.add("https://ipfs.filebase.io/ipfs/");
		
		return ipfsUrl;
	}
}
