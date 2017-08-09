package com.xyy.springmvc.mybatis.services;

import java.util.List;

import com.xyy.springmvc.mybatis.beans.User;
  

public interface ILoginService {
	 public User Login(String account);

	 public	void save(User user);

	 public	void update(User user);

	 public	void delete(int id);

	 public	User findByAccount(String account);

	 public	List<User> findAll();
	 
	 public User doLogin(String loginName,String pwd);
	 
	 public List<User> findUserByAccount(String account) ;
}
