package com.infosiatec.controller;

import java.io.File;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.infosiatec.common.CommonFileCreate;
import com.infosiatec.domain.BusinessCardVO;
import com.infosiatec.service.BusinessCardService;

@RestController
public class BusinessCardController {
	
	@Autowired
	private BusinessCardService businessCardService;
	
	@Autowired
	ServletContext c;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index(ModelAndView mv) {
		System.out.println("index");
		mv.addObject("hm", businessCardService.selectBusinessCardList());
		mv.setViewName("index");
		return mv;
	}
	
	@RequestMapping(value="/create", method = RequestMethod.GET)
	public ModelAndView create(ModelAndView mv) {
		System.out.println("Create");
		mv.setViewName("create");
		return mv;
	}
	
	@RequestMapping(value ="/createFile", method = RequestMethod.POST)
	public String test(BusinessCardVO vo, MultipartFile file, HttpServletRequest req, 
			@RequestParam("fileName")String fileName, @RequestParam("jsonData")byte[] jsonData) throws Exception{
		
		//C:\Users\kan03\Documents\GitHub\business_card\src\main\webapp\resources
		
		// C:\Users\kan03\Documents\GitHub\business_card\src\main\webapp\
		
		
		String filePath = c.getRealPath("/file").concat("test"); 
		System.out.println(filePath);
		String imgPath = filePath + File.separator + "thumbnails";
		System.out.println(imgPath);
		//String xmlPath = CommonFileCreate.calcPath(imgPath);
		//System.out.println(xmlPath);
		/**
		
		
		String fileName = null;
		if(file.getOriginalFilename() != null && !file.getOriginalFilename().equals("")) {
			fileName = CommonFileCreate.fileSave(imgPath, file.getOriginalFilename(), file.getBytes(), xmlPath);
			
			//img에 원본이미지 파일 경로 + 	파일명 저장
			vo.setImg(File.separator + "imgUpload" + xmlPath + File.separator + fileName);
		
			// thumbnails에 썸네일 파일경로 + 파일명 저장
			vo.setThumbnails(File.separator + "imgUpload" + xmlPath + File.separator + "s" + File.separator + "_s" + fileName);
		}else {
			//이미지가 없으면 임시이미지 출력
			fileName = File.separator + "images" + File.separator + "none.jpg";
			vo.setImg(fileName);
			vo.setThumbnails(fileName);
		}
		System.out.println("fileName : " + fileName);
		*/
		return "";
	}
	
	@RequestMapping(value = "/selectBusinessCard", method = RequestMethod.POST)
	public String selectBusinessCard(@RequestParam("idx") int idx, @RequestParam("id")String fileName) {
 		return businessCardService.selectBusinessCard(fileName, idx);
	}
	
	@RequestMapping(value = "/updateBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> updateBusinessCard(@RequestParam("id")String id,@RequestParam("idx") int idx, @RequestParam("jsonData") String jsonData) {
		return businessCardService.updateBusinessCard(id, idx, jsonData);
	}
	
	@RequestMapping(value = "/selectBusinessCardList")
	public Map<Integer, String> returnList(Model model, @RequestParam(defaultValue="1") int curPage){
		Map<Integer, String> list = businessCardService.selectBusinessCardList();		
		return list;
	}
	@RequestMapping(value = "/createBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> createBusinessCard(@RequestParam("jsonData") String jsonData, @RequestParam("fileName")String fileName, @RequestParam("imgData")String imgData) {
		return businessCardService.createBusinessCard(jsonData, fileName, imgData);
	}
	
	@RequestMapping(value = "/deleteBusinessCard", method= RequestMethod.POST)
	public ResponseEntity<String> deleteBusinessCard(@RequestParam("checkList") String[] idx) {
		return businessCardService.deleteBusinessCard(idx);
	}
	
	@RequestMapping(value ="searchBusinessCard", method = RequestMethod.POST)
	public Map<Integer, String>searchList(@RequestParam("keyword")String keyword, @RequestParam("searchType")String searchType){
		Map<Integer, String> list = businessCardService.searchBusinessCardList(keyword, searchType);
		return list;
	}
	
	
}
