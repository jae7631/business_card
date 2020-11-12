package com.infosiatec.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.infosiatec.domain.BusinessCardVO;
import com.infosiatec.service.BusinessCardService;

@RestController
public class BusinessCardController {
	
	@Autowired
	private BusinessCardService businessCardService;

	//メイン画面
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index(ModelAndView mv) {
		System.out.println("index");
		mv.addObject("hm", businessCardService.selectBusinessCardList());
		mv.setViewName("index");
		return mv;
	}
		
	//新規作成画面に遷移
	@RequestMapping(value="/create", method = RequestMethod.GET)
	public ModelAndView create(ModelAndView mv) {
		System.out.println("Create");
		mv.setViewName("create");
		return mv;
	}
	//保存テンプレート選択
	@RequestMapping(value="/load", method=RequestMethod.GET)
	public ModelAndView test(ModelAndView mv, String id, Integer idx) {
		mv.addObject("jsonData", businessCardService.selectBusinessCard(id, idx));
		mv.setViewName("create");
		return mv;
	}	
	
	//リスト出力
	@RequestMapping(value = "/selectBusinessCardList")
	public List<BusinessCardVO> returnList(@RequestParam(defaultValue="1") int curPage){
		List<BusinessCardVO>list = businessCardService.selectBusinessCardList();
		return list;
	}
	
	//リスト選択
	@RequestMapping(value = "/selectBusinessCard", method = RequestMethod.POST)
	public String selectBusinessCard(@RequestParam("idx") Integer idx, @RequestParam("id")String fileName) {
 		return businessCardService.selectBusinessCard(fileName, idx);
	}
	
	//リストアップデート
	@RequestMapping(value = "/updateBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> updateBusinessCard(@RequestParam("id")String id,@RequestParam("idx") Integer idx, @RequestParam("jsonData") String jsonData, @RequestParam("imgData")String imgData)
	throws Exception{
		return businessCardService.updateBusinessCard(id, idx, jsonData, imgData);
	}
	
	//リスト作成
	@RequestMapping(value = "/createBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> createBusinessCard(@RequestParam("jsonData") String jsonData, @RequestParam("fileName")String fileName, @RequestParam("imgData")String imgData) 
	throws Exception{
		return businessCardService.createBusinessCard(jsonData, fileName, imgData);
	}
	
	//リスト削除
	@RequestMapping(value = "/deleteBusinessCard", method= RequestMethod.POST)
	public ResponseEntity<String> deleteBusinessCard(@RequestParam("checkList") String[] idx) {
		return businessCardService.deleteBusinessCard(idx);
	}
	
	//リスト検索
	@RequestMapping(value ="/searchBusinessCard", method = RequestMethod.POST)
	public List<BusinessCardVO> searchList(@RequestParam("keyword")String keyword,  @RequestParam("searchType")String searchType){
		return  businessCardService.searchBusinessCardList(keyword, searchType);
	}
}
