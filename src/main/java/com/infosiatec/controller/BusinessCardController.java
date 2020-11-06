package com.infosiatec.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
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
	HttpSession session;

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
	//テスト
	@RequestMapping(value="/test/{id}/", method=RequestMethod.POST)
	public ModelAndView test(ModelAndView mv, @PathVariable("idx")Integer idx, @PathVariable("id")String id) {
		System.out.println("test");	
		mv.addObject("loadData", businessCardService.selectBusinessCard(id, idx));
		mv.setViewName("create");
		return mv;
	}	
	
	
	//リスト選択
	@RequestMapping(value = "/selectBusinessCard", method = RequestMethod.POST)
	public String selectBusinessCard(@RequestParam("idx") int idx, @RequestParam("id")String fileName) {
 		return businessCardService.selectBusinessCard(fileName, idx);
	}
	
	//リストアップデート
	@RequestMapping(value = "/updateBusinessCard", method = RequestMethod.POST)
	public ResponseEntity<String> updateBusinessCard(@RequestParam("id")String id,@RequestParam("idx") int idx, @RequestParam("jsonData") String jsonData) {
		return businessCardService.updateBusinessCard(id, idx, jsonData);
	}
	
	//リスト出力
	@RequestMapping(value = "/selectBusinessCardList")
	public List<BusinessCardVO> returnList(Model model, @RequestParam(defaultValue="1") int curPage){
		//Map<Integer, String> list = businessCardService.selectBusinessCardList();
		List<BusinessCardVO>list = businessCardService.selectBusinessCardList();
		return list;
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
	@RequestMapping(value ="searchBusinessCard", method = RequestMethod.POST)
	public Map<Integer, String>searchList(@RequestParam("keyword")String keyword, @RequestParam("searchType")String searchType){
		Map<Integer, String> list = businessCardService.searchBusinessCardList(keyword, searchType);
		return list;
	}
	
	
}
