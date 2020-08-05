package com.infosiatec.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
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

		List<String> ids = businessCardService.test();

		System.out.println("###########################");
		System.out.println(ids.get(0));
		System.out.println("###########################");

		mv.setViewName("home");

		return mv;
	}

	@RequestMapping(value = "/createBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> createBusinessCard(@RequestParam("jsonData") String jsonData) {
		System.out.println("############################test#################################");
		
		return businessCardService.createBusinessCard(jsonData);
	}
}
