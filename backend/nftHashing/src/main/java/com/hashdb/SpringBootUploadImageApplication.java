package com.hashdb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.hashdb.service.HasingService;

//@EnableJpaRepositories(basePackages = {"com.hashdb.repositories"})
@SpringBootApplication
public class SpringBootUploadImageApplication {

	@Autowired
	HasingService hasingService;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootUploadImageApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE",
						"OPTIONS");
			}
		};
	}

	@EventListener(ApplicationReadyEvent.class)
	public void storeHashofNft() {
		hasingService.storeHashOfNFT();
	}

}
