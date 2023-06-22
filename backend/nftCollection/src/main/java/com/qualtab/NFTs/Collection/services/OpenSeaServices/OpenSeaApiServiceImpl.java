package com.qualtab.NFTs.Collection.services.OpenSeaServices;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.qualtab.NFTs.Collection.entities.NFT;
import com.qualtab.NFTs.Collection.entities.NFTResponse;
import com.qualtab.NFTs.Collection.repositories.NFTDocumentRepository;

import mongo.NFTDocument;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

@Service
public class OpenSeaApiServiceImpl implements OpenSeaApiService {

	private OpenSeaService openSeaService;
	private NFTDocumentRepository nftDocumentRepository;
//................................................................................................................................................
	@Autowired
	public OpenSeaApiServiceImpl(NFTDocumentRepository nftRepository) {
		this.nftDocumentRepository = nftRepository;
		Retrofit retrofit = new Retrofit.Builder()
				.baseUrl("https://testnets-api.opensea.io/api/v1/")
				.addConverterFactory(JacksonConverterFactory.create())
				.build();
		openSeaService = retrofit.create(OpenSeaService.class);
	}
//................................................................................................................................................
	@Override
	public void syncOpenSeaNFTs(String prevValue) throws IOException, InterruptedException {
		
		System.out.println(" \n starting from cursor: "+ prevValue);

		do {
			Call<NFTResponse> call = openSeaService.getNFTs("asc",1, false, prevValue);
		Response<NFTResponse> response = call.execute();
//        System.out.print(response.body());
		if (response.isSuccessful()) {

			NFTResponse nftResponse = response.body();	
			//nextValue = nftResponse.getNext();
			prevValue = nftResponse.getPrev();

			List<NFT> assets = nftResponse.getAssets();
			
			for (NFT asset : assets) {
				
				if(!ObjectUtils.isEmpty(asset.getImageOriginalUrl())) {
					
					NFTDocument nftDocument = new NFTDocument();
					nftDocument.setId(UUID.randomUUID());
					nftDocument.setNftId(String.valueOf(asset.getId()));
					nftDocument.setTokenId(asset.getTokenId());
					nftDocument.setTokenMetadata(asset.getTokenMetadata());
					nftDocument.setImageOriginalUrl(asset.getImageOriginalUrl());
					nftDocument.setAddress(asset.getAssetContract().getAddress());
					nftDocument.setPrevious(nftResponse.getPrev());
					nftDocument.setNext(nftResponse.getNext());
					nftDocument.setProvider("OpenSea");
					nftDocumentRepository.save(nftDocument);
					System.out.println("\n \t\t\t Saved with "+ prevValue +"\n address " + nftResponse.getAddress());
				}

			}
			
		} else {
			System.out.println(response.errorBody() +"\n");
			System.out.println(response.message());

//			throw new IOException("Failed to retrieve NFTs from OpenSea API");
		}
		Thread.sleep(1500);
		}while(prevValue != null);
		
	}
//................................................................................................................................................	
	
	@Override
	public String loadPrevValue() {
		NFTDocument nftDocument = nftDocumentRepository.findFirstByOrderByNftIdDesc();
		if(nftDocument == null)
			return null;
		else 
			return nftDocument.getPrevious();

	}
	

}