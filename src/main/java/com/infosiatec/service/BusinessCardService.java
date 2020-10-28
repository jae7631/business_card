package com.infosiatec.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface BusinessCardService {

	public ResponseEntity<String> createBusinessCard(String jsonData, String id, String imgData);
	public String selectBusinessCard(String id, int idx);
	public Map<Integer, String> selectBusinessCardList();
	public ResponseEntity<String> updateBusinessCard(String id, int idx, String jsonData);
	public ResponseEntity<String> deleteBusinessCard(String[]  idx);
	public Map<Integer, String> searchBusinessCardList(String keyword, String searchType);
}
