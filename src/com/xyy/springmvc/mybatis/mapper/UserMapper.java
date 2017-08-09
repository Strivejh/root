package com.xyy.springmvc.mybatis.mapper;

import java.util.List;
import java.util.Map;

import com.xyy.springmvc.mybatis.beans.User;
  
 

/**
* @ClassName: UserDao 
* @Description: 用户的数据库操作类 
*
 */
public interface UserMapper {

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
	* @param param 查询条件
	* @return List<User>  返回类型  用户列表
	* @throws
	 */
	List<User> findUserPage(Map<String, Object> param);
	
	
	/**
	* @Title: countUserNums 
	* @Description: 按条件统计用户数量
	* @param param 统计条件
	* @return    参数 
	* int  返回用户数量
	* @throws
	 */
	int countUserNums(Map<String, Object> param);
	
	
	User findByAccount(String account);
	
	
	
    List<User> findUserByAccount(String account);
}
