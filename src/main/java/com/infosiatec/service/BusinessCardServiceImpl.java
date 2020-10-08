package com.infosiatec.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.infosiatec.common.CommonFileCreate;
import com.infosiatec.common.CommonFileRead;
import com.infosiatec.domain.BusinessCardVO;
import com.infosiatec.mapper.BusinessCardMapper;

@Service
public class BusinessCardServiceImpl implements BusinessCardService {

	// json file path
	private static final String FILE_PATH = "C:\\Users\\kan03\\Desktop\\";
	//private static final String FILE_EXTENSION = ".svg";
	private static final String FILE_EXTENSION = ".json";
	@Autowired
	private BusinessCardMapper mapper;

	private Integer getNextIdx() {
		if(mapper.selectMaxIdx()==null) {
			System.out.println("null");
		}
		return mapper.selectMaxIdx()+1;
	}
	
	public ResponseEntity<String> createBusinessCard(String jsonData, String id) {
		Integer idx = getNextIdx();

		String fileName = id + "-"+idx;
		String filePath = FILE_PATH + fileName + FILE_EXTENSION;

		if (!CommonFileCreate.fileCreate(filePath, jsonData)) {
			return new ResponseEntity<String>("ERROR", HttpStatus.OK);
		}
		mapper.insertBusinessCard(id, fileName);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	public String selectBusinessCard(String id, int idx) {
		String fileName = mapper.selectFileName(id, idx);
		String filePath = FILE_PATH + fileName + FILE_EXTENSION;
		String jsonData = new String();
		try {
			jsonData = CommonFileRead.fileRead(filePath);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonData;
	};
	
	public Map<Integer, String> selectBusinessCardList() {
		Map<Integer, String> map = new HashMap<Integer, String>();
		List<BusinessCardVO> businessCardList = mapper.selectBusinessCardList();
		if (businessCardList != null) {
 			for (BusinessCardVO vo : businessCardList) {
				String filePath = FILE_PATH + vo.getFileName()+FILE_EXTENSION;
				try {
					//map.put(vo.getIdx(), CommonFileRead.fileRead(filePath));
					map.put(vo.getIdx(), vo.getFileName());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			System.out.println(map);
		}
		return map;
	}
	
	public List<BusinessCardVO> list(){
		List<BusinessCardVO> businessCardList = mapper.selectBusinessCardList();
		return businessCardList;
	}

	public ResponseEntity<String> updateBusinessCard(String id, int idx, String jsonData) {
		String filePath = FILE_PATH + id + idx + FILE_EXTENSION;
		if (!CommonFileCreate.fileOverwrite(filePath, jsonData)) {
			return new ResponseEntity<String>("ERROR", HttpStatus.OK);
		}
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
}
