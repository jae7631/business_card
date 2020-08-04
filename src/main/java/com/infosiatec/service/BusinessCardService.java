package com.infosiatec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosiatec.mapper.BusinessCardMapper;

@Service
public class BusinessCardService {

	@Autowired
	private BusinessCardMapper mapper;
	
	public List<String> createBusinessCard(){
		
		return mapper.selectID();
	}
}
