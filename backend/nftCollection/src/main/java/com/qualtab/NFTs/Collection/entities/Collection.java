package com.qualtab.NFTs.Collection.entities;

import java.util.UUID;

import org.springframework.data.annotation.Id;

// .................collecting collections by chain from simpleHash Api..........................

public class Collection {

	@Id
	private UUID id;
	private String collectionId;
	private String nextCursor;
	private String previous;

	// false means it's not done, and true means it's done.
	private boolean isSyncDone;

	public String getPrevious() {
		return previous;
	}

	public void setPrevious(String previous) {
		this.previous = previous;
	}

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

	public boolean isSyncDone() {
		return isSyncDone;
	}

	public void setSyncDone(boolean isSyncDone) {
		this.isSyncDone = isSyncDone;
	}

	@Override
	public String toString() {
		return "Collection [id=" + id + ", collectionId=" + collectionId + ", nextCursor=" + nextCursor + ", previous="
				+ previous + ", isSyncDone=" + isSyncDone + ", createdDate=" + createdDate + ", provider=" + provider
				+ "]";
	}
}
