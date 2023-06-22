package com.qualtab.NFTs.Collection.services.SimpleHashServices;

import com.qualtab.NFTs.Collection.entities.CollectionsResponse;
import com.qualtab.NFTs.Collection.entities.simpleHash.SimpleHashNftResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface SimpleHashService {
	
	@GET("collections/{chainName}")
    Call<CollectionsResponse> getCollections(
            				 @Path("chainName") String chainName,
            				 @Header("x-api-key") String apiKey,
                             @Query("limit") int limit);
	
    @GET("collections/{chainName}")
    Call<CollectionsResponse> getCollections(
            				 @Path("chainName") String chainName,
            				 @Header("x-api-key") String apiKey,
                             @Query("limit") int limit,
                             @Query("cursor") String cursor);
    
    @GET("collection/{collectionId}")
    Call<SimpleHashNftResponse> getNftByCollection(
            				 @Path("collectionId") String collectionId,
            				 @Header("x-api-key") String apiKey,
                             @Query("limit") int limit);

    
    @GET("collection/{collectionId}")
    Call<SimpleHashNftResponse> getNftByCollection(
            				 @Path("collectionId") String collectionId,
            				 @Header("x-api-key") String apiKey,
                             @Query("limit") int limit,
                             @Query("cursor") String cursor);
}

	