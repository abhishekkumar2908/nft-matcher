package com.qualtab.NFTs.Collection.services.SimpleHashServices;

import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.qualtab.NFTs.Collection.entities.Collection;
import com.qualtab.NFTs.Collection.entities.CollectionId;
import com.qualtab.NFTs.Collection.entities.CollectionsResponse;
import com.qualtab.NFTs.Collection.entities.NFT;
import com.qualtab.NFTs.Collection.entities.simpleHash.SimpleHashNftResponse;
import com.qualtab.NFTs.Collection.repositories.CollectionsRepository;
import com.qualtab.NFTs.Collection.repositories.NFTDocumentRepository;

import mongo.NFTDocument;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;
import util.Extractor;

@Service
public class SimpleHashApiServiceImpl implements SimpleHashApiService {
	String nextNft = null;
	private SimpleHashService simpleHashService;
	private CollectionsRepository collectionsRepository;
	private NFTDocumentRepository nftDocumentRepository;

	@Value("${simpleHash.apiKey}")
	String apiKey;
	
	String cursor = "ZmZmOWUzZTIzN2I3MWE2NDY2NWJiMmE3ZWI2YjBlZDdfX25leHQ";

//................................................................................................................................................
	@Autowired
	public SimpleHashApiServiceImpl(CollectionsRepository collectionsRepository,
									NFTDocumentRepository nftDocumentRepository) {
		
		this.collectionsRepository = collectionsRepository;
		Retrofit retrofit = new Retrofit.Builder().baseUrl("https://api.simplehash.com/api/v0/nfts/")
				.addConverterFactory(JacksonConverterFactory.create()).build();
		simpleHashService = retrofit.create(SimpleHashService.class);

		this.nftDocumentRepository = nftDocumentRepository;
	}

//................................................................................................................................................
	@Override
	public void syncNFTs(String previous) throws IOException, InterruptedException {

		System.out.println(" \n starting from cursor: " + previous);
//.............currentChain will carry chain name that would be passed to the API.........................................................		
		String[] chains = {"ethereum", "avalanche"};
			   

//		boolean isFirstTime = true;
		for(String currentChain : chains) {
		do {
			Call<CollectionsResponse> call = null;
//			if (isFirstTime) {
//				call = simpleHashService.getCollections(currentChain, apiKey, 50, cursor);
//				isFirstTime = false;
//			} else {
				call = simpleHashService.getCollections(currentChain, apiKey, 50, previous);
//			}

			Response<CollectionsResponse> response = call.execute();
			if (response.isSuccessful()) {

				CollectionsResponse collectionsResponse = response.body();
				if (collectionsResponse.getPrivious() != null)
					previous = Extractor.prevFromUrl(collectionsResponse.getPrivious());

				List<CollectionId> collectionIds = collectionsResponse.getCollections();

				for (CollectionId ids : collectionIds) {

					Collection collections = new Collection();
					collections.setChain(currentChain);
					collections.setCollectionId(ids.getCollectionId());
					collections.setNextCursor(collectionsResponse.getNextCursor());
					collections.setPrevious(previous);
					collections.setCreatedDate(new Date().getTime());
					


					Collection collection = collectionsRepository.findByCollectionId(ids.getCollectionId());

					if (ObjectUtils.isEmpty(collection)) {
						collections.setId(UUID.randomUUID());
						collections.setSyncDone(false);
						collectionsRepository.save(collections);						
						
						do {

							
							Call<SimpleHashNftResponse> hashNftCall = simpleHashService
									.getNftByCollection(ids.getCollectionId(), apiKey, 50, nextNft);

							Response<SimpleHashNftResponse> nftResponse = hashNftCall.execute();

							if (nftResponse.isSuccessful()) {
								
								SimpleHashNftResponse hashNftResponse = nftResponse.body();
								
								hashNftResponse.getNfts().stream().forEach(nft -> {

									NFTDocument nftDocument = new NFTDocument();
									nftDocument.setId(UUID.randomUUID());
									nftDocument.setCollectionId(nft.getCollection().getCollection_id());
									nftDocument.setNftId(nft.getNft_id());
									nftDocument.setAddress(nft.getContract_address());
									nftDocument.setImageOriginalUrl(nft.getExtra_metadata().getImage_original_url());
									nftDocument.setNext(hashNftResponse.getNext_cursor());
									nftDocument.setPrevious(hashNftResponse.getPrevious());
									nftDocument.setProvider(currentChain);
									nftDocument.setTokenId(nft.getToken_id());									
									nftDocument.setTokenMetadata(nft.getExtra_metadata().getMetadata_original_url());
									nftDocument.setHashed(false);
									NFTDocument nftDocument2 = nftDocumentRepository.findByNftId(nft.getNft_id());
									if (!ObjectUtils.isEmpty(nftDocument2)) {
										nftDocument.setId(nftDocument2.getId());
									}

									nftDocumentRepository.save(nftDocument);
									if(hashNftResponse.getNext_cursor() != null){
										 nextNft = hashNftResponse.getNext_cursor();
									}
									else
										nextNft = null;
								});
							}
							System.out.println("\n NFT Saved with collectionId " + ids.getCollectionId());

						} while (nextNft != null);
						

						collections.setSyncDone(true);
						collectionsRepository.save(collections);

					}
				}

			} else 
				System.out.println(response.errorBody() + "\n");
//			Thread.sleep(100);

		} while (previous != null);
	  }
	}

//................................................................................................................................................	

	@Override
	public String loadPrevCursor() {
		Collection collection = collectionsRepository.findFirstByOrderByCreatedDateDesc();
		if (collection == null) {
			return cursor;
		} else {
			return collection.getPrevious();
		}
	}
	
 
}