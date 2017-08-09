package com.xyy.springmvc.mybatis.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xyy.springmvc.mybatis.beans.User;
import com.xyy.springmvc.mybatis.mapper.UserMapper;
import com.xyy.springmvc.mybatis.services.IUserService;
import com.xyy.springmvc.mybatis.utils.PageBean;
 
 

/**
 * @ClassName: UserServiceImpl
 * @Description: 用户操作 
 * 
 */
@Service("userservice")
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserMapper userDao;

	/**
	 * @Title: addUser 新增用户
	 * @param user
	 *            新增的用户对象 void 返回类型
	 * @throws
	 */
	@Override
	public void addUser(User user) {

		userDao.addUser(user);
	}

	/**
	 * @Title: delUser
	 * @Description: 按条件删除用户
	 * @param param
	 *            删除参数 void 返回类型
	 * @throws
	 */
	@Override
	public void delUser(Map<String, Object> param) {
		userDao.delUser(param);
	}

	/**
	 * @Title: updUser 修改用户
	 * @param user
	 *            需要修改的用户对象 void 返回类型
	 * @throws
	 */
	@Override
	public void updUser(User user) {
		userDao.updUser(user);
	}

	/**
	 * @Title: findUser
	 * @Description: 按条件返回用户列表,不分页
	 * @param param
	 *            查询条件
	 * @return List<User> 返回类型 用户列表
	 * @throws
	 */
	@Override
	public List<User> findUser(Map<String, Object> param) {
		return userDao.findUser(param);
	}

	/**
	 * @Title: findUserPage
	 * @Description: 按条件返回用户列表,分页
	 * @param param
	 *            查询条件
	 * @param pageBean
	 *            分页对象
	 * @return List<User> 返回类型 用户列表
	 * @throws
	 */
	@Override
	public List<User> findUserPage(Map<String, Object> param, PageBean pageBean) {
		pageBean.initMap(param);
		int total = userDao.countUserNums(param);
		
		if(total>0){
			pageBean.setTotalRows(userDao.countUserNums(param));
			pageBean.repaginate();
			return userDao.findUserPage(param);
		}
		
		return new ArrayList<>();
	}

}
