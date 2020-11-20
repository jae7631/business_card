package com.infosiatec.domain;

import lombok.Data;

@Data
public class BusinessCardVO {
	
	private String id;
	private Integer idx;
	private String fileName;
	private boolean isDelete;
	private String thumbnailPath;
	private String jsonPath;
	private String pngPath;
	private String widthFlag;
}
