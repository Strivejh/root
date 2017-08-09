package com.xyy.springmvc.mybatis.services;

import java.util.List;
import java.util.Map;

import com.xyy.springmvc.mybatis.beans.Student;
import com.xyy.springmvc.mybatis.utils.PageBean;
 
 

/** 
 * @ClassName: IStudentService 
 * @Description: 学生操作service层 
 *  
 */
public interface IStudentService {

	/**
	 * @return 
	* @Title: addStudent 
	* @Description: 新增学生 
	* @param param: 学生类
	* @return int  返回影响行数
	* @throws
	*/
	int addStudent(Student student);
	
	
	/**
	* @Title: delStudent 
	* @Description: 按条件删除学生
	* @param param    删除参数
	* void  返回类型 
	* @throws
	 */
	void delStudent(Map<String, Object> param);
	
	/**
	* @Title: updateStudent 
	* @Description: 按条件修改学生
	* @param param   学生类
	* @return int  返回影响行数
	* @throws
	 */
	int updateStudent(Student student);
	
	/**
	* @Title: findStudent 
	* @Description: 按条件査询学生
	* @param param   査询参数
	* @return List<Student>  返回学生列表
	* @throws
	*/
	List<Student> findStudent(Map<String, Object> param);
	
	/**
	* @Title: findStudentPage 
	* @Description: 按条件返回学生列表,分页
	* @param param 查询条件
	* @return List<Student>  返回学生列表
	* @throws
	 */
	List<Student> findStudentPage(Map<String, Object> param, PageBean pageBean);
	
}
