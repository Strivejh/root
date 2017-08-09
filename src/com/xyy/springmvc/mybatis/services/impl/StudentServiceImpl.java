package com.xyy.springmvc.mybatis.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xyy.springmvc.mybatis.beans.Student;
import com.xyy.springmvc.mybatis.mapper.StudentDao;
import com.xyy.springmvc.mybatis.services.IStudentService;
import com.xyy.springmvc.mybatis.utils.PageBean;
 

/**
 * @ClassName: StudentServiceImpl 
 * @Description: 学生接口实现类 
 * 
 */
@Service("studentService")
public class StudentServiceImpl implements IStudentService {

	@Autowired
	private StudentDao studentDao;
	
	/**
	* @Title: addStudent 
	* @Description: 新增学生 
	* @param param: 学生类
	* @return int  返回影响行数
	* @throws
	*/
	@Override
	public int addStudent(Student student) {
		return studentDao.addStudent(student);
	}
	
	/**
	* @Title: delStudent 
	* @Description: 按条件删除学生
	* @param param    删除参数
	* void  返回类型 
	* @throws
	 */
	@Override
	public void delStudent(Map<String, Object> param) {
		studentDao.delStudent(param);
	}

	/**
	* @Title: updateStudent 
	* @Description: 按条件修改学生
	* @param param   学生类
	* @return int  返回影响行数
	* @throws
	 */
	@Override
	public int updateStudent(Student student) {
		return studentDao.updateStudent(student);
	}

	/**
	* @Title: findStudent 
	* @Description: 按条件査询学生
	* @param param   査询参数
	* @return List<Student>  返回学生列表
	* @throws
	*/
	@Override
	public List<Student> findStudent(Map<String, Object> param) {
		return studentDao.findStudent(param);
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
	public List<Student> findStudentPage(Map<String, Object> param,PageBean pageBean) {
		pageBean.initMap(param);
		int total = studentDao.countStuNums(param);
		if(total > 0){
			pageBean.setTotalRows(total);
			return studentDao.findStudentPage(param);
		}
		return null;
	}

}
