package com.qualtab.NFTs.Collection;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.qualtab.NFTs.Collection.services.OpenSeaApiService;

@SpringBootApplication
public class CollectionApplication {
	
	@Autowired
	private OpenSeaApiService openSeaApiService;

	public static void main(String[] args) {
		SpringApplication.run(CollectionApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void onApplicationReady(ApplicationReadyEvent event) throws IOException, InterruptedException {
		String prevValue = openSeaApiService.loadPrevValue();
		openSeaApiService.syncOpenSeaNFTs(prevValue);
	}

}
