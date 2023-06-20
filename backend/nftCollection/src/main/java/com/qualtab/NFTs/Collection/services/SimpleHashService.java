package com.qualtab.NFTs.Collection.services;

import com.qualtab.NFTs.Collection.modal.CollectionsResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Query;


public interface SimpleHashService {
    @GET("collections")
    Call<CollectionsResponse> getNFTs(
            				 @Header("x-api-key") String apiKey,
    						 @Query("chain") String chainName,
    						 @Query("order_direction") String orderDirection,
                             @Query("limit") int limit,
                             @Query("cursor") String cursor);
}

