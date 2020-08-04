package com.infosiatec.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
		
		List<String> ids = businessCardService.createBusinessCard();
		
		System.out.println("###########################");
		System.out.println(ids.get(0));
		System.out.println("###########################");
		
		mv.setViewName("home");
		
		return mv;
	}
}
