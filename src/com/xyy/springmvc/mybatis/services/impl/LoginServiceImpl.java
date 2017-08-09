package com.xyy.springmvc.mybatis.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 

import com.xyy.springmvc.mybatis.beans.User;
import com.xyy.springmvc.mybatis.mapper.UserMapper;
import com.xyy.springmvc.mybatis.services.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private UserMapper mapper; 
	
	@Override
	public User Login(String account) {
		 
		return mapper.findByAccount(account);
	}

	@Override
	public void save(User user) {
		 
	}

	@Override
	public void update(User user) {
	 
		
	}

	@Override
	public void delete(int id) {
		 
	}

 
	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User doLogin(String loginName, String pwd) { 
		User user = new User();
		user.setAccount(loginName);
		List<User> us = findUserByAccount(user.getAccount());
		if(!us.isEmpty()  && us.get(0).getPwd().equals(pwd) ){
			user = us.get(0);
			user.setUserUTC("GMT+8");
			return user;
		}
		return null;
	}
	public List<User> findUserByAccount(String account) {
		return mapper.findUserByAccount(account);

	}

	@Override
	public User findByAccount(String account) {
		// TODO Auto-generated method stub
		return null;
	}
 

}
