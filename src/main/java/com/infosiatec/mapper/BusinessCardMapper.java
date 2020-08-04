package com.infosiatec.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BusinessCardMapper {
		
	List<String> selectID();
}
