package com.infosiatec.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.infosiatec.domain.BusinessCardVO;

@Mapper
public interface BusinessCardMapper {
	
	void insertBusinessCard(String fileName);
	String selectFilename(String id, int idx);
	List<BusinessCardVO> selectBusinessCardList(String id);
}
