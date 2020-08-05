package com.infosiatec.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface BusinessCardService {

	public List<String> test();
	public ResponseEntity<String> createBusinessCard(String jsonData);
}
