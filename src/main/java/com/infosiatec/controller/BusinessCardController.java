package com.infosiatec.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.infosiatec.service.BusinessCardService;

@RestController
public class BusinessCardController {

	@Autowired
	private BusinessCardService businessCardService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home(ModelAndView mv) {
		System.out.println("normal home page");

		System.out.println("#############HOME##############");

		mv.setViewName("home");

		return mv;
	}

	@RequestMapping(value = "/createBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> createBusinessCard(@RequestParam("jsonData") String jsonData) {
		//TODO
		//get sessionID
		String id = "testID";
		return businessCardService.createBusinessCard(jsonData, id);
	}
	
	@RequestMapping(value = "/selectBusinessCard", method = RequestMethod.POST)
	public String selectBusinessCard(@RequestParam("idx") int idx) {
		//TODO
		//get sessionID
		String id = "testID";
		return businessCardService.selectBusinessCard(id, idx);
	}
	
	@RequestMapping(value = "/selectBusinessCardList", method = RequestMethod.POST)
	public Map<Integer, String> selectBusinessCardList() {
		//TODO
		//get sessionID
		String id = "testID";
		return businessCardService.selectBusinessCardList(id);
	}
	
	@RequestMapping(value = "/updateBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> updateBusinessCard(int idx, String jsonData) {
		//TODO
		//get sessionID
		String id = "testID";
		return businessCardService.updateBusinessCard(id, idx, jsonData);
	}
}
