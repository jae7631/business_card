package com.infosiatec.service;


import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

import com.infosiatec.domain.BusinessCardVO;


public interface BusinessCardService {

	public ResponseEntity<String> createBusinessCard(String jsonData, String id);
	public String selectBusinessCard(String id, int idx);
	public Map<Integer, String> selectBusinessCardList();
	public ResponseEntity<String> updateBusinessCard(String id, int idx, String jsonData);
	public ResponseEntity<String> deleteBusinessCard(String id, int idx);
}
