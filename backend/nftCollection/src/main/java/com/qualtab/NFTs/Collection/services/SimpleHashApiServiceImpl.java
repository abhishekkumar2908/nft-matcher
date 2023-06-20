package com.qualtab.NFTs.Collection.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qualtab.NFTs.Collection.modal.CollectionId;
import com.qualtab.NFTs.Collection.modal.Collections;
import com.qualtab.NFTs.Collection.modal.CollectionsResponse;
import com.qualtab.NFTs.Collection.repositories.CollectionsRepository;

import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

@Service
public class SimpleHashApiServiceImpl implements SimpleHashApiService {

	private SimpleHashService simpleHashService;
	private CollectionsRepository collectionsRepository;
//................................................................................................................................................
	@Autowired
	public SimpleHashApiServiceImpl(CollectionsRepository collectionsRepository) {
		this.collectionsRepository = collectionsRepository;
		Retrofit retrofit = new Retrofit.Builder()
				.baseUrl("https://api.simplehash.com/api/v0/nfts/collections/")
				.addConverterFactory(JacksonConverterFactory.create())
				.build();
		simpleHashService = retrofit.create(SimpleHashService.class);
	}
//................................................................................................................................................
	@Override
	public void syncAvalancheFujiNFTs(String prevValue) throws IOException, InterruptedException {
		
		System.out.println(" \n starting from cursor: "+ prevValue);

		do {
			Call<CollectionsResponse> call = simpleHashService.getNFTs("segmint_sk_f053f4b7-98e5-4c82-a1b9-8a409bef90b0_a01tnii6qimceimn", 
																	   "asc", 50, prevValue);
		Response<CollectionsResponse> response = call.execute();
//        System.out.print(response.body());
		if (response.isSuccessful()) {

			CollectionsResponse collectionsResponse = response.body();	
			//nextValue = nftResponse.getNext();
			prevValue = collectionsResponse.getNextCursor();
//			System.out.print("prevValue : " + prevValue);
			List<CollectionId> collectionIds = collectionsResponse.getCollections();
			
			for (CollectionId ids : collectionIds) {
				
					
					Collections collections = new Collections();
					collections.setId(UUID.randomUUID());
					collections.setCollectionId(ids.getCollectionId());
					collections.setNextCursor(collectionsResponse.getNextCursor());
					collections.setCreatedDate(new Date().getTime());
					collections.setProvider("simpleHash");
					collectionsRepository.save(collections);
					System.out.println("\n Saved with "+ prevValue +"\n address " + ids.getCollectionId());
				

			}
			
		} else {
			System.out.println(response.errorBody() +"\n");
			System.out.println(response.message());

//			throw new IOException("Failed to retrieve NFTs from SimpleHash API");
		  }
		}while(prevValue != null);
		
	}
	
//................................................................................................................................................	
	
	@Override
	public String loadPrevValue() {
	    Collections collection = collectionsRepository.findFirstByOrderByCreatedDateDesc();
	    if (collection == null) {
	        return null;
	    } else {
	        return collection.getNextCursor();
	    }
	}



	
	
	

}