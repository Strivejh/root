package com.xyy.springmvc.mybatis.beans;

import java.util.Date;

/**
* @ClassName: User 
* @Description: 人员对象 
*
 */
public class User {

	//姓名
	private String name;
	//部门
	private String deptNo;
	//职务
	private String post;
	//性别
	private Integer sex;
	//生日
	private Date birthday;
	//联系方式
	private String phone;
	//住址
	private String addr;
	//入职时间
	private Date entryDay;
	//状�?
	private Integer status;
	
	//头像地址
	private String picUrl;
	//工号
	private String jobNumber;
	
	//级别
	private Integer levels;
	//id
	private Long id;
	//账号
	private String account;
	//密码
	private String pwd; 
	//
	private String rightCode; 

	private String userUTC="GMT+8";
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDeptNo() {
		return deptNo;
	}
	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}
	public String getPost() {
		return post;
	}
	public void setPost(String post) {
		this.post = post;
	}
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public Date getEntryDay() {
		return entryDay;
	}
	public void setEntryDay(Date entryDay) {
		this.entryDay = entryDay;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getPicUrl() {
		return picUrl;
	}
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
	public String getJobNumber() {
		return jobNumber;
	}
	public void setJobNumber(String jobNumber) {
		this.jobNumber = jobNumber;
	}
	public Integer getLevels() {
		return levels;
	}
	public void setLevels(Integer levels) {
		this.levels = levels;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
 
	@Override
	public String toString() {
		return "User [name=" + name + ", deptNo=" + deptNo + ", post=" + post
				+ ", sex=" + sex + ", birthday=" + birthday + ", phone="
				+ phone + ", addr=" + addr + ", entryDay=" + entryDay
				+ ", status=" + status + ", picUrl=" + picUrl + ", jobNumber="
				+ jobNumber + ", levels=" + levels + ", id=" + id
				+ ", account=" + account + ", pwd=" + pwd + ", rightCode="
				+ rightCode + ", userUTC=" + userUTC + "]";
	}
	public String getRightCode() {
		return rightCode;
	}
	public void setRightCode(String rightCode) {
		this.rightCode = rightCode;
	}
	public String getUserUTC() {
		return userUTC;
	}
	public void setUserUTC(String userUTC) {
		this.userUTC = userUTC;
	}
}
