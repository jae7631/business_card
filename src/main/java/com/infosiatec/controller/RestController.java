package com.infosiatec.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.infosiatec.service.BusinessCardService;

@org.springframework.web.bind.annotation.RestController

public class RestController {

	@Autowired
	private BusinessCardService businessCardService;
	
	@RequestMapping(value = "/selectBusinessCardList")
	public Map<Integer, String> returnList(Model model){
		Map<Integer, String> list = businessCardService.selectBusinessCardList();
		return list;
	}
	@RequestMapping(value = "/createBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> createBusinessCard(@RequestParam("jsonData") String jsonData, @RequestParam("fileName")String fileName) {
		//TODO
		//get sessionID
		return businessCardService.createBusinessCard(jsonData, fileName);
	}
	
	@RequestMapping(value = "/deleteBusinessCard", method= RequestMethod.POST)
	public ResponseEntity<String> deleteBusinessCard(@RequestParam("idx")int idx, @RequestParam("id") String id) {
		return businessCardService.deleteBusinessCard(idx, id);
	}
	
	@RequestMapping(value ="searchBusinessCard", method = RequestMethod.POST)
	public Map<Integer, String>searchList(@RequestParam("keyword")String keyword, @RequestParam("searchType")String searchType){
		Map<Integer, String> list = businessCardService.searchBusinessCardList(keyword, searchType);
		return list;
	}

}
