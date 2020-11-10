package com.infosiatec.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

	@Autowired
	ServletContext c;

	// json file path
	// private static final String FILE_PATH = "C:\\Users\\kan03\\Desktop\\";
	private static final String FILE_PATH = "C:\\Users\\ゆう\\Desktop\\";
	// private static final String FILE_EXTENSION = ".svg";
	private static final String FILE_EXTENSION = ".json";
	@Autowired
	private BusinessCardMapper mapper;

	private Integer getNextIdx() {
		if (mapper.selectMaxIdx() == null) {
			System.out.println("null");
		}
		return mapper.selectMaxIdx() + 1;
	}

	public ResponseEntity<String> createBusinessCard(String jsonData, String id, String imgData) throws Exception {
		Integer idx = getNextIdx();
		String fileName = id + "-" + idx;
		String jsonPath = c.getRealPath("/").concat("jsonData").concat(File.separator);
		String pngPath = c.getRealPath("/").concat("pngData").concat(File.separator);

		jsonPath = CommonFileCreate.existJson(fileName, jsonPath);
		pngPath = CommonFileCreate.existPng(fileName, pngPath);

		if (!(CommonFileCreate.jsonCreate(jsonData, jsonPath) && CommonFileCreate.pngCreate(imgData, pngPath))) {
			return new ResponseEntity<String>("ERROR", HttpStatus.OK);
		}
		String thumbPath = CommonFileCreate.resize(pngPath, fileName);
		mapper.insertBusinessCard(id, fileName, thumbPath, jsonPath, pngPath);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	public String selectBusinessCard(String id, int idx) {
		String fileName = mapper.selectFileName(id, idx);
		String jsonPath = c.getRealPath("/").concat("jsonData").concat(File.separator) + fileName + FILE_EXTENSION;
		String jsonData = new String();
		try {
			jsonData = CommonFileRead.fileRead(jsonPath);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonData;
	};

	public List<BusinessCardVO> selectBusinessCardList() {
		List<BusinessCardVO> businessCardList = mapper.selectBusinessCardList();
		List<BusinessCardVO> selectList = new ArrayList<BusinessCardVO>();
		String jsonPath = new String();
		String pngPath = new String();
		String thumbnailPath = new String();

		if (businessCardList != null) {
			for (BusinessCardVO vo : businessCardList) {
				jsonPath = vo.getJsonPath().substring(vo.getJsonPath().lastIndexOf("jsonData\\"));
				thumbnailPath = vo.getThumbnailPath().substring(vo.getThumbnailPath().lastIndexOf("thumb\\"));
				pngPath = vo.getPngPath().substring(vo.getPngPath().lastIndexOf("pngData\\"));
				vo.setJsonPath(jsonPath);
				vo.setThumbnailPath(thumbnailPath);
				vo.setPngPath(pngPath);
				try {
					selectList.add(vo);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			System.out.println(selectList);
		}
		return selectList;
	}

	public ResponseEntity<String> updateBusinessCard(String id, int idx, String jsonData) {
		String filePath = FILE_PATH + id + "-" + idx + FILE_EXTENSION;
		if (!CommonFileCreate.fileOverwrite(filePath, jsonData)) {
			return new ResponseEntity<String>("ERROR", HttpStatus.OK);
		}
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	public ResponseEntity<String> deleteBusinessCard(String[] idx) {
		mapper.deleteBusinessCard(idx);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@Override
	public List<BusinessCardVO> searchBusinessCardList(String keyword, String searchType) {
		List<BusinessCardVO> searchList = mapper.searchBusinessCard(keyword, searchType);
		List<BusinessCardVO> resultList = new ArrayList<BusinessCardVO>();
		String jsonPath = new String();
		String pngPath = new String();
		String thumbnailPath = new String();

		if (searchList != null) {
			for (BusinessCardVO vo : searchList) {
				jsonPath = vo.getJsonPath().substring(vo.getJsonPath().lastIndexOf("jsonData\\"));
				thumbnailPath = vo.getThumbnailPath().substring(vo.getThumbnailPath().lastIndexOf("thumb\\"));
				pngPath = vo.getPngPath().substring(vo.getPngPath().lastIndexOf("pngData\\"));
				vo.setJsonPath(jsonPath);
				vo.setThumbnailPath(thumbnailPath);
				vo.setPngPath(pngPath);
				try {
					resultList.add(vo);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			System.out.println(resultList);
		}
		return resultList;
		
	}
}
