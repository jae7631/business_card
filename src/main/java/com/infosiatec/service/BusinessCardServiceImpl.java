package com.infosiatec.service;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.infosiatec.mapper.BusinessCardMapper;

@Service
public class BusinessCardServiceImpl implements BusinessCardService {

	//json file path
	private static final String FILE_PATH = "C:\\Users\\jae76\\Desktop\\";
	
	@Autowired
	private BusinessCardMapper mapper;
	
	public List<String> test(){
		
		return mapper.selectID();
	}
	
	public ResponseEntity<String> createBusinessCard(String jsonData) {
		//@TODO
		//convert sessionId
		String id = "testID";
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
}
