package com.qualtab.NFTs.Collection;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.qualtab.NFTs.Collection.services.SimpleHashApiService;

@SpringBootApplication
public class CollectionApplication {
	
//	@Autowired
//	private OpenSeaApiService openSeaApiService;
	@Autowired
	private SimpleHashApiService simpleHashApiService;

	public static void main(String[] args) {
		SpringApplication.run(CollectionApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void onApplicationReady(ApplicationReadyEvent event) throws IOException, InterruptedException {
		String prevValue = simpleHashApiService.loadPrevValue();
		simpleHashApiService.syncAvalancheFujiNFTs(prevValue);
	}

}
