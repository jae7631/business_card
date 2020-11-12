package com.infosiatec.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.infosiatec.domain.BusinessCardVO;

public interface BusinessCardService {

	public ResponseEntity<String> createBusinessCard(String jsonData, String id, String imgData) throws Exception;
	public String selectBusinessCard(String id, Integer idx);
	//public Map<Integer, String> selectBusinessCardList();
	public List<BusinessCardVO> selectBusinessCardList();
	public ResponseEntity<String> updateBusinessCard(String id, Integer idx, String jsonData, String imgData)throws Exception;
	public ResponseEntity<String> deleteBusinessCard(String[]  idx);
	public List<BusinessCardVO> searchBusinessCardList(String keyword, String searchType);
}
