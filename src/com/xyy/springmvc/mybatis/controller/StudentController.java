package com.xyy.springmvc.mybatis.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xyy.springmvc.mybatis.beans.Student;
import com.xyy.springmvc.mybatis.services.IStudentService;
import com.xyy.springmvc.mybatis.utils.DWZJsonResponseResult;
import com.xyy.springmvc.mybatis.utils.PageBean;
 
 

/**
 * @ClassName: StudentController
 * @Description: 学生操作控制层 
 */
@Controller
@RequestMapping("student")
public class StudentController extends BaseController {

	@Autowired
	private IStudentService studentService;
	
	/**
	 * @Title: findStudentList
	 * @Description: 分页查找学生列表
	 * @param pageNum
	 *            页码
	 * @param stuName
	 *            按照学生姓名查询
	 * @param request
	 *            请求request
	 * @return 参数 String 返回类型 返回URL地址
	 * @throws
	 */
	@RequestMapping("/studentList")
	public String findStudentList(int pageNum, String stuName,
			HttpServletRequest request) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("stuName", stuName);
		PageBean pageBean = new PageBean();
		pageBean.setCurrentPage(pageNum);
		List<Student> stuList = studentService.findStudentPage(param, pageBean);
		request.setAttribute("stuList", stuList);
		request.setAttribute("pageBean", pageBean);
		return toPage("student", "studentList");
	}

	
	/** 
	 * @Title: toAddStuPage 
	 * @Description: 到达添加学生界面
	 * @param pageNum 当前页码
	 * @param request
	 * @return    参数 
	 * String  返回类型 
	 * @throws 
	 */
	@RequestMapping("/toAddStuPage")
	public String toAddStuPage(int pageNum, HttpServletRequest request){
		request.setAttribute("pageNum", pageNum);
		return toPage("student", "stuAdd");
	}
	
	/** 
	 * @Title: checkStuName 
	 * @Description: 检查学生姓名是否有重复 
	 * @param stuName: 接收学生姓名
	 * @param response    参数 
	 * void  返回类型 
	 * @throws 
	 */
	@RequestMapping("/checkStuName")
	public void checkStuName(String stuName,
			HttpServletResponse response){
		Map<String, Object> param = new HashMap<String, Object>();
		StringBuffer json= new StringBuffer();
		//判断学生姓名是否为空，如果姓名为空则提示姓名不能为空
		if(stuName == null || stuName.trim() == "")
		{
			json.append(DWZJsonResponseResult.createFalied("学生姓名不能为空"));
		}
		//如果学生姓名不为空则进行判断学生姓名是否有重复
		else
		{
			param.put("stuName", stuName);
			List<Student> list = studentService.findStudent(param);
			//如果学生姓名没有重复，则用户名合法
			if(list.isEmpty())
			{
				json.append(DWZJsonResponseResult.createSuccess());
			}
			//学生姓名有重复则不合法，提示学生姓名重复
			else
			{
				json.append(DWZJsonResponseResult.createFalied("学生姓名不能重复"));
			}
		}
		System.out.println(json.toString());
		jsonToPage(json.toString(), response);
	}
	
	/**
	 * @Title: addStudent
	 * @Description: 添加学生方法
	 * @param student
	 *            添加学生类
	 * @param request
	 *            请求
	 * @param pageNum
	 *            页码
	 * @return 参数 String 返回类型
	 * @throws
	 */
	@RequestMapping("/addStu")
	public void addStudent(@ModelAttribute("student") Student student,
			HttpServletRequest request, int pageNum, HttpServletResponse response) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("stuName", student.getStuName());
		studentService.addStudent(student);
		DWZJsonResponseResult json = DWZJsonResponseResult.initSuccess();
		json.setNavTabId("studentList");
		jsonToPage(json.toJSONString(),response);
	}
	
	
	/** 
	 * @Title: toUpdateStuPage 
	 * @Description: 到达修改学生信息的页面
	 * @param pageNum 页码
	 * @param stuName 从前台传过来的学生姓名
	 * @param request 
	 * @return    参数 
	 * String  返回类型 
	 * @throws 
	 */
	@RequestMapping("/toUpdateStuPage")
	public String toUpdateStuPage(int pageNum, Integer id, HttpServletRequest request){
		Map<String, Object> param = new HashMap<>();
		param.put("id",id);
		List<Student> stu = studentService.findStudent(param );
		request.setAttribute("student", stu.get(0));
		request.setAttribute("pageNum", pageNum);
		return toPage("student", "updateStu");
	}
	
	
	/** 
	 * @Title: updateStu  
	 * @Description: 修改学生信息 
	 * @param student 学生类
	 * @param request
	 * @param pageNum 页码
	 * @return    参数 
	 * String  返回类型 
	 * @throws 
	 */
	@RequestMapping("/updateStu")
	public void updateStu(@ModelAttribute("student") Student student, 
			HttpServletRequest request, int pageNum, HttpServletResponse response){
		studentService.updateStudent(student);
		DWZJsonResponseResult json = DWZJsonResponseResult.initSuccess();
		json.setNavTabId("studentList");
		jsonToPage(json.toJSONString(),response);
	}
	
	/** 
	 * @Title: delStu 
	 * @Description: 删除某一个学生
	 * @param stuName 学生姓名
	 * @param response    参数 
	 * void  返回类型 
	 * @throws 
	 */
	@RequestMapping("/delStu")
	public void delStu(Integer id, HttpServletResponse response){
		Map<String, Object> param = new HashMap<>();
		param.put("id",id);
		studentService.delStudent(param );
	}
}
