package com.infosiatec.domain;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.Data;

@Data
public class PagingMaker {

	private int startPage;
	private int endPage;
	private boolean prev;
	private boolean next;
	
 
	@Autowired
	private PagingVO vo;


	public PagingMaker(PagingVO vo, int total) {
		this.vo = vo;
		int realEnd = (int)Math.ceil(total * 1.0) / vo.getAmount();
		this.endPage = (int)(Math.ceil(vo.getPageNum() / 10.0) * 10);
		this.startPage = getEndPage()-9;
		
		if(realEnd < this.endPage) {
			this.endPage = realEnd;
		}
		this.next = getEndPage()<realEnd;
		this.prev = getStartPage()>1;
	}
	
	
}
