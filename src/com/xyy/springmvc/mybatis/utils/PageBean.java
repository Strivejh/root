package com.xyy.springmvc.mybatis.utils;

import java.util.Map;

/**
 * 〈分页对象�?
 * 
 * @author 陈建�?
 * @version 114
 * @see [相关�?方法]
 * @since cse v1.0
 */
public class PageBean {
	/**
	 * 属�?serialVersionUID
	 */
	//每页显示条数
	public static final int PAGESIZE = 50;
	//当前�?
	private int currentPage;
	//总页�?
	public int totalPages;
	//每页显示条数
	private int pageSize;
	//总行�?
	private int totalRows;
	//显示�?��位置
	private int startNum;
	//显示结束位置
	private int endIndex;
	//下一�?
	private int nextPage;
	//前一�?
	private int previousPage;
	//查询记录�?
	private int queryRecordSize;
	//是否有下�?��
	private boolean hasNextPage;
	//是否有上�?��
	private boolean hasPreviousPage;

	public PageBean() {
		this.currentPage = 1;
		this.pageSize = PAGESIZE;
		this.startNum =0;
		this.endIndex = PAGESIZE;
	}

	public void initMap(Map<String, Object> param){
		param.put("startNum", this.startNum);
		param.put("endIndex", this.endIndex);
	}
	
	public PageBean(int totalRows) {
		this(totalRows, 1, PAGESIZE);
	}

	public PageBean(int totalRows, int currentPage) {
		this(totalRows, currentPage, PAGESIZE);
	}

	public PageBean(int totalRows, int currentPage, int pageSize) {
		this.currentPage = 1;

		this.totalPages = 0;

		this.pageSize = 0;

		this.totalRows = 0;

		this.startNum = 0;

		this.nextPage = 0;

		this.previousPage = 0;

		this.queryRecordSize = 10;

		this.hasNextPage = false;

		this.hasPreviousPage = false;

		this.pageSize = pageSize;
		this.currentPage = currentPage;
		this.totalRows = totalRows;
		this.endIndex = pageSize;
		repaginate();
	}

	public void repaginate() {
		if (this.totalRows % this.pageSize == 0) {
			this.totalPages = (this.totalRows / this.pageSize);
		} else {
			this.totalPages = (this.totalRows / this.pageSize + 1);
		}

		if (this.currentPage >= this.totalPages) {
			this.hasNextPage = false;
			this.currentPage = this.totalPages;
		} else {
			this.hasNextPage = true;
		}

		if (this.currentPage <= 1) {
			this.hasPreviousPage = false;
			this.currentPage = 1;
		} else {
			this.hasPreviousPage = true;
		}
		if(this.currentPage <= 1)
		{
			this.startNum = 0;
		}else
		{
			this.startNum = ((this.currentPage - 1) * this.pageSize + 1);
		}
		
		if(this.currentPage > 1 && this.currentPage != this.totalPages)
		{
			this.endIndex = this.currentPage * this.pageSize ;
		}else if(this.currentPage > 1 && this.currentPage == this.totalPages)
		{
			this.startNum = (this.currentPage - 1) * this.pageSize;
			this.endIndex = this.totalRows;
		}else
		{
			this.endIndex = this.pageSize ;
		}
		
		this.nextPage = (this.currentPage + 1);

		if (this.nextPage >= this.totalPages) {
			this.nextPage = this.totalPages;
		}

		this.previousPage = (this.currentPage - 1);

		if (this.previousPage <= 1) {
			this.previousPage = 1;
		}

		if (this.queryRecordSize != 0)
			return;
		this.queryRecordSize = this.pageSize;
	}

	public boolean isHasNextPage() {
		return this.hasNextPage;
	}

	public boolean isHasPreviousPage() {
		return this.hasPreviousPage;
	}

	public int getNextPage() {
		return this.nextPage;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}

	public int getPreviousPage() {
		return this.previousPage;
	}

	public void setPreviousPage(int previousPage) {
		this.previousPage = previousPage;
	}

	public int getCurrentPage() {
		return this.currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
		this.startNum = pageSize*(this.currentPage-1)+1;
		this.endIndex = pageSize*(this.currentPage);
	}

	public int getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalPages() {
		return this.totalPages;
	}

	public int getTotalRows() {
		return this.totalRows;
	}

	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}

	public void setHasPreviousPage(boolean hasPreviousPage) {
		this.hasPreviousPage = hasPreviousPage;
	}

	public int getStartNum() {
		return this.startNum;
	}

	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}

	public int getQueryRecordSize() {
		return this.queryRecordSize;
	}

	public void setQueryRecordSize(int queryRecordSize) {
		this.queryRecordSize = queryRecordSize;
	}

	public void setHasNextPage(boolean hasNextPage) {
		this.hasNextPage = hasNextPage;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}
}
