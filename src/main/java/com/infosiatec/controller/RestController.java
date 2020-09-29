package com.infosiatec.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.infosiatec.service.BusinessCardService;

@org.springframework.web.bind.annotation.RestController
public class RestController {

	@Autowired
	BusinessCardService service;
	
	@RequestMapping(value = "/selectBusinessCardList", method = RequestMethod.POST)
	public ModelAndView selectBusinessCardList() {
		ModelAndView mav = new ModelAndView("index");
 		 Map<Integer, String> list = service.selectBusinessCardList();
		 mav.addObject("list",list);
		 return mav;
	}
}
