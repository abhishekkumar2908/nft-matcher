package com.qualtab.NFTs.Collection.services;

import com.qualtab.NFTs.Collection.modal.CollectionsResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;


public interface SimpleHashService {
    @GET("avalanche-fuji")
    Call<CollectionsResponse> getNFTs(@Query("order_direction") String orderDirection,
                             @Query("limit") int limit,
                             @Query("include_orders") boolean includeOrders,
                             @Query("cursor") String cursor);
}

