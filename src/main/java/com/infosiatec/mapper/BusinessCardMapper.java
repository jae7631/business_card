package com.infosiatec.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.infosiatec.domain.BusinessCardVO;

@Mapper
public interface BusinessCardMapper {
	
	void insertBusinessCard(@Param("id") String id, @Param("fileName") String fileName,
			@Param("thumbnailPath")String thumbnailPath, @Param("jsonPath")String jsonPath, @Param("pngPath")String pngPath);
	String selectFileName(@Param("id") String id, @Param("idx") int idx);
	List<BusinessCardVO> selectBusinessCardList();
	List<BusinessCardVO> searchBusinessCard(@Param("keyword")String keyword, @Param("searchType")String searchType);
	Integer selectMaxIdx();
	void deleteBusinessCard(@Param("idx") String[] idx);
}
