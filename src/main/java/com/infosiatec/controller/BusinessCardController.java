package com.infosiatec.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

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
	
	@RequestMapping(value = "/selectBusinessCard", method = RequestMethod.POST)
	public String selectBusinessCard(@RequestParam("idx") int idx, @RequestParam("id")String fileName) {
 		return businessCardService.selectBusinessCard(fileName, idx);
	}
	
	@RequestMapping(value = "/updateBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> updateBusinessCard(@RequestParam("id")String id,@RequestParam("idx") int idx, @RequestParam("jsonData") String jsonData) {
		return businessCardService.updateBusinessCard(id, idx, jsonData);
	}
	
	@RequestMapping(value = "/selectBusinessCardList")
	public List<BusinessCardVO> returnList(Model model, @RequestParam(defaultValue="1") int curPage){
		//Map<Integer, String> list = businessCardService.selectBusinessCardList();
		List<BusinessCardVO>list = businessCardService.selectBusinessCardList();
		return list;
	}
	@RequestMapping(value = "/createBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> createBusinessCard(@RequestParam("jsonData") String jsonData, @RequestParam("fileName")String fileName, @RequestParam("imgData")String imgData) 
	throws Exception{
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
