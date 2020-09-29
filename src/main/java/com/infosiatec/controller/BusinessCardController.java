package com.infosiatec.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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
		mv.setViewName("index");
		return mv;
	}

	@RequestMapping(value = "/createBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> createBusinessCard(@RequestParam("jsonData") String jsonData, @RequestParam("fileName")String fileName) {
		//TODO
		//get sessionID
		return businessCardService.createBusinessCard(jsonData, fileName);
	}
	
	@RequestMapping(value = "/selectBusinessCard", method = RequestMethod.POST)
	public String selectBusinessCard(@RequestParam("idx") int idx) {
		//TODO
		//get sessionID
		String id = "testID";
		return businessCardService.selectBusinessCard(id, idx);
	}
	
	/*
	 * @RequestMapping(value = "/selectBusinessCardList", method =
	 * RequestMethod.POST) public ModelAndView selectBusinessCardList() {
	 * ModelAndView mav = new ModelAndView(); Map<Integer, String> list =
	 * businessCardService.selectBusinessCardList(); mav.addObject("list",list);
	 * return mav; }
	 */
	
	
	
	@RequestMapping(value = "/updateBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> updateBusinessCard(@RequestParam("idx") int idx, @RequestParam("svg") String svgData) {
		//TODO
		//get sessionID
		String id = "testID";
		return businessCardService.updateBusinessCard(id, idx, svgData);
	}
}
