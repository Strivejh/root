package com.xyy.springmvc.mybatis.services;

import java.util.List;
import java.util.Map;

import com.xyy.springmvc.mybatis.beans.User;
import com.xyy.springmvc.mybatis.utils.PageBean;
 
 

/**
* @ClassName: IUserService 
* @Description: 用户操作 
*
 */
public interface IUserService {

	/**
	* @Title: addUser 新增用户
	* @param user    新增的用户对象
	* void  返回类型 
	* @throws
	 */
	void addUser(User user);
	
	/**
	* @Title: delUser 
	* @Description: 按条件删除用户
	* @param param    删除参数
	* void  返回类型 
	* @throws
	 */
	void delUser(Map<String, Object> param);
	
	/**
	* @Title: updUser 修改用户
	* @param user    需要修改的用户对象
	* void  返回类型 
	* @throws
	 */
	void updUser(User user);
	
	/**
	* @Title: findUser 
	* @Description: 按条件返回用户列表,不分页
	* @param param 查询条件
	* @return List<User>  返回类型  用户列表
	* @throws
	 */
	List<User> findUser(Map<String, Object> param);
	
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
	List<User> findUserPage(Map<String, Object> param, PageBean pageBean);
}
