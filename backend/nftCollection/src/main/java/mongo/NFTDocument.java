package mongo;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection = "nft")
public class NFTDocument {

	@Id
	private UUID id;
	private String collectionId;
	private String nftId;
	private String imageOriginalUrl;
	private String tokenMetadata;
	private String tokenId;
	private String address;
	private String next;
	private String previous;
	private String provider;
	
	
	
	public String getCollectionId() {
		return collectionId;
	}

	public void setCollectionId(String collectionId) {
		this.collectionId = collectionId;
	}

	
	

	public String getImageOriginalUrl() {
		return imageOriginalUrl;
	}

	public void setImageOriginalUrl(String imageOriginalUrl) {
		this.imageOriginalUrl = imageOriginalUrl;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getNftId() {
		return nftId;
	}

	public void setNftId(String nftId) {
		this.nftId = nftId;
	}

	public String getNext() {
		return next;
	}

	public void setNext(String next) {
		this.next = next;
	}

	public String getPrevious() {
		return previous;
	}

	public void setPrevious(String previous) {
		this.previous = previous;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public String getTokenId() {
		return tokenId;
	}

	public void setTokenId(String tokenId) {
		this.tokenId = tokenId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTokenMetadata() {
		return tokenMetadata;
	}

	public void setTokenMetadata(String tokenMetadata) {
		this.tokenMetadata = tokenMetadata;
	}

}
