package com.hashdb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.hashdb.service.HasingService;

//@EnableJpaRepositories(basePackages = {"com.hashdb.repositories"})
@SpringBootApplication
public class SpringBootUploadImageApplication {
	
	@Autowired
	HasingService hasingService;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootUploadImageApplication.class, args);
	}
	
	
	@EventListener(ApplicationReadyEvent.class)
	public void storeHashofNft() {
		hasingService.storeHashOfNFT();
	}
	
}
