package com.infosiatec.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class businessCardController {

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public ModelAndView home(ModelAndView mv) {
		System.out.println("normal home page");
		
		mv.setViewName("home");
		
		return mv;
	}
}
