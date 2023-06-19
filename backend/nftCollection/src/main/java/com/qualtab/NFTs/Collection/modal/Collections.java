package mongo;

import java.math.BigInteger;
import java.util.UUID;

import org.springframework.data.annotation.Id;

// .................collecting collections by chain from simpleHash Api..........................

public class Collections {

	@Id
	private UUID id;
	private String collectionId;
	private String nextCursor;
	private long createdDate;
	private String provider;

	public long getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(long createdDate) {
		this.createdDate = createdDate;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getCollectionId() {
		return collectionId;
	}
	public void setCollectionId(String collectionId) {
		this.collectionId = collectionId;
	}
	public String getNextCursor() {
		return nextCursor;
	}
	public void setNextCursor(String nextCursor) {
		this.nextCursor = nextCursor;
	}
	public String getProvider() {
		return provider;
	}
	public void setProvider(String provider) {
		this.provider = provider;
	}
	
	@Override
	public String toString() {
		return "CollectionDocument [id=" + id + ", collectionId=" + collectionId + ", nextCursor=" + nextCursor + ",createdDate=" + createdDate + ", provider="
				+ provider +  "]";
	}	
}
	
	


