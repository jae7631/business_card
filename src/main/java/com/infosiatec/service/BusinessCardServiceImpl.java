package com.infosiatec.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.print.attribute.HashAttributeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.infosiatec.common.CommonFileRead;
import com.infosiatec.domain.BusinessCardVO;
import com.infosiatec.mapper.BusinessCardMapper;

@Service
public class BusinessCardServiceImpl implements BusinessCardService {

	//json file path
	private static final String FILE_PATH = "C:\\Users\\jae76\\Desktop\\";
	
	@Autowired
	private BusinessCardMapper mapper;
	
	public ResponseEntity<String> createBusinessCard(String jsonData, String id) {
		String filePath = FILE_PATH + id + ".json";
		
		try {
			FileWriter file = new FileWriter(filePath);
			file.write(jsonData);
			file.flush();
			file.close();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("ERROR", HttpStatus.OK);
		}
		
		mapper.insertBusinessCard(id);
		
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
	public String selectBusinessCard(String id, int idx) {
		
		String fileName = mapper.selectFilename(id, idx);
		String filePath = FILE_PATH + fileName;
		String jsonData = new String();
		
		try {
			jsonData = CommonFileRead.fileRead(filePath);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return jsonData;
	}
	
	public Map<Integer, String> selectBusinessCardList(String id){
		Map<Integer, String> map = new HashMap<Integer, String>();
		
		List<BusinessCardVO> businessCardList = mapper.selectBusinessCardList(id);
		if(businessCardList != null) {
			for(BusinessCardVO vo : businessCardList) {
				String filePath = FILE_PATH + vo.getFileName();
				try {
					map.put(vo.getIdx(), CommonFileRead.fileRead(filePath));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		return map;
	}
}
