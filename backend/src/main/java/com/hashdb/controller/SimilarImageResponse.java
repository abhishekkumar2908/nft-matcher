package com.hashdb.controller;

public class SimilarImageResponse {
	private String message;

	public SimilarImageResponse (String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
