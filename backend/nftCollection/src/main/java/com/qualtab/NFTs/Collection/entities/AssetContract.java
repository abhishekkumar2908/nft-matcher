package com.qualtab.NFTs.Collection.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AssetContract {
	@JsonProperty("address")
    private String address;

    // Getter and setter for address

    public String getAddress() {
        return address;
    }

  
}
