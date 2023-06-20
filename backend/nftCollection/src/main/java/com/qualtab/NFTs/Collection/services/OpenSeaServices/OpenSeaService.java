package com.qualtab.NFTs.Collection.services.OpenSeaServices;

import com.qualtab.NFTs.Collection.entities.NFTResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;


public interface OpenSeaService {
    @GET("assets")
    Call<NFTResponse> getNFTs(@Query("order_direction") String orderDirection,
                             @Query("limit") int limit,
                             @Query("include_orders") boolean includeOrders,
                             @Query("cursor") String cursor);
}

