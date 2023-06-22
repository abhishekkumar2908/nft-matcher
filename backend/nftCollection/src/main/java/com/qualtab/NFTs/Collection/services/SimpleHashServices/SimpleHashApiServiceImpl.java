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

	private SimpleHashService simpleHashService;
	private CollectionsRepository collectionsRepository;
	private NFTDocumentRepository nftDocumentRepository;

	@Value("${simpleHash.apiKey}")
	String apiKey;

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
	public void syncAvalancheFujiNFTs(String prevValue) throws IOException, InterruptedException {

		System.out.println(" \n starting from cursor: " + prevValue);
//.............currentChain will carry chain name that would be passed to the API.........................................................		
		String currentChain = "avalanche-fuji";

		boolean isFirstTime = true;

		do {
			Call<CollectionsResponse> call = null;
			if (isFirstTime) {
				call = simpleHashService.getCollections(currentChain, apiKey, 50);
				isFirstTime = false;
			} else {
				call = simpleHashService.getCollections(currentChain, apiKey, 50, prevValue);
			}

			Response<CollectionsResponse> response = call.execute();
//        System.out.print(response.body());
			if (response.isSuccessful()) {

				CollectionsResponse collectionsResponse = response.body();
				System.out.print("prevValue : " + collectionsResponse.getPrivious());
				if (collectionsResponse.getPrivious() != null)
					prevValue = Extractor.prevFromUrl(collectionsResponse.getPrivious());

				List<CollectionId> collectionIds = collectionsResponse.getCollections();

				for (CollectionId ids : collectionIds) {

					Collection collections = new Collection();

					collections.setCollectionId(ids.getCollectionId());
					collections.setNextCursor(collectionsResponse.getNextCursor());
					collections.setPrevious(prevValue);
					collections.setCreatedDate(new Date().getTime());
					collections.setProvider("simpleHash, by chain name: " + currentChain);

					System.out.println("\n Saved with " + prevValue + "\n address " + ids.getCollectionId());

					Collection collection = collectionsRepository.findByCollectionId(ids.getCollectionId());

					if (ObjectUtils.isEmpty(collection)) {
						collections.setId(UUID.randomUUID());
						collections.setSyncDone(false);
						collectionsRepository.save(collections);

						boolean isDone = false;
						do {

							Call<SimpleHashNftResponse> hashNftCall = simpleHashService
									.getNftByCollection(ids.getCollectionId(), apiKey, 50);

							Response<SimpleHashNftResponse> nftResponse = hashNftCall.execute();
							if (nftResponse.isSuccessful()) {

								SimpleHashNftResponse hashNftResponse = nftResponse.body();

								hashNftResponse.getNfts().stream().forEach(nft -> {

									NFTDocument nftDocument = new NFTDocument();
									nftDocument.setId(UUID.randomUUID());
									nftDocument.setNftId(nft.getNft_id());

									nftDocument.setAddress(nft.getContract_address());
									nftDocument.setImageOriginalUrl(nft.getImage_url());
									nftDocument.setNext(hashNftResponse.getNext());
									nftDocument.setPrevious(hashNftResponse.getPrevious());
									nftDocument.setProvider(currentChain);
									nftDocument.setTokenId(nft.getToken_id());
									nftDocument.setTokenMetadata(nft.getExtra_metadata().getMetadata_original_url());

									NFTDocument nftDocument2 = nftDocumentRepository.findByNftId(nft.getNft_id());
									if (!ObjectUtils.isEmpty(nftDocument2)) {
										nftDocument.setId(nftDocument2.getId());
									}

									nftDocumentRepository.save(nftDocument);

								});
							}

						} while (isDone);
						

						collections.setSyncDone(true);
						collectionsRepository.save(collections);

					} else {
//						collections.setId(collection.getId());
//						collectionsRepository.save(collections);

					}

				}

			} else {
				System.out.println(response.errorBody() + "\n");
				System.out.println(response.message());

//			throw new IOException("Failed to retrieve NFTs from SimpleHash API");
			}
			Thread.sleep(1500);

		} while (prevValue != null);

	}

//................................................................................................................................................	

	@Override
	public String loadPrevCursor() {
		Collection collection = collectionsRepository.findFirstByOrderByCreatedDateDesc();
		if (collection == null) {
			return null;
		} else {
			return collection.getPrevious();
		}
	}
	
 
}