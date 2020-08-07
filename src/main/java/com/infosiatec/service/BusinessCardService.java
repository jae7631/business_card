package com.infosiatec.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface BusinessCardService {

	public ResponseEntity<String> createBusinessCard(String jsonData, String id);
	public String selectBusinessCard(String id, int idx);
	public Map<Integer, String> selectBusinessCardList(String id);
	public ResponseEntity<String> updateBusinessCard(String id, int idx, String jsonData);
}
