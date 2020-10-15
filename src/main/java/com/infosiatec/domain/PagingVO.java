package com.infosiatec.domain;

import lombok.Data;

@Data
public class PagingVO {
	
	//現在のページナンバー
	private int pageNum = 1;
	//データの数
	private int amount = 10;
	
	
}
