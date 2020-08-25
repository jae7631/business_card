package com.infosiatec.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.infosiatec.domain.BusinessCardVO;

@Mapper
public interface BusinessCardMapper {
	
	void insertBusinessCard(@Param("id") String id, @Param("fileName") String fileName);
	String selectFileName(@Param("id") String id, @Param("idx") int idx);
	List<BusinessCardVO> selectBusinessCardList(String id);
	int selectMaxIdx();
}
