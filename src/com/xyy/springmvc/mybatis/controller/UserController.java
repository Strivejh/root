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
import com.xyy.springmvc.mybatis.beans.User;
import com.xyy.springmvc.mybatis.services.IUserService;
import com.xyy.springmvc.mybatis.utils.DWZJsonResponseResult;
import com.xyy.springmvc.mybatis.utils.PageBean;

@Controller
@RequestMapping("user")
public class UserController extends BaseController{
	
	
	@Autowired
	private IUserService userservice;
	
	@RequestMapping("/userList")
	public String findUserList(int pageNum, String username,
			HttpServletRequest request) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("userName", username);
		PageBean pageBean = new PageBean();
		pageBean.setCurrentPage(pageNum);
		List<User> userList = userservice.findUserPage(param, pageBean);
		request.setAttribute("userList", userList);
		request.setAttribute("pageBean", pageBean);
		return toPage("user", "userList");
	}

	@RequestMapping("/toAddUserPage")
	public String toAddUserPage(int pageNum, HttpServletRequest request){
		request.setAttribute("pageNum", pageNum);
		return toPage("user", "userAdd");
	}
	
	@RequestMapping("/checkUserName")
	public void checkStuName(String userName,
			HttpServletResponse response){
		Map<String, Object> param = new HashMap<String, Object>();
		StringBuffer json= new StringBuffer();
		//判断学生姓名是否为空，如果姓名为空则提示姓名不能为空
		if(userName == null || userName.trim() == "")
		{
			json.append(DWZJsonResponseResult.createFalied("用户姓名不能为空"));
		}
		//如果学生姓名不为空则进行判断学生姓名是否有重复
		else
		{
			param.put("userName", userName);
			List<User> list = userservice.findUser(param);
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
	
	@RequestMapping("/addUser")
	public void addUser(@ModelAttribute("user") User user,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("userName", user.getName());
		userservice.addUser(user);
		DWZJsonResponseResult json = DWZJsonResponseResult.initSuccess();
		json.setNavTabId("userList");
		jsonToPage(json.toJSONString(),response);
	}
	
	@RequestMapping("/toUpdateUserPage")
	public String toUpdateUserPage(int pageNum, Integer id, HttpServletRequest request){
		System.out.println("该用户的ID为："+id);
		
		Map<String, Object> param = new HashMap<>();
		param.put("id",id);
		List<User> user = userservice.findUser(param);
		
		
		System.out.println(1111111111);
		request.setAttribute("user", user.get(0));
		request.setAttribute("pageNum", pageNum);
		return toPage("user", "userUpd");
	}
	
	@RequestMapping("/updateUser")
	public void updateUser(@ModelAttribute("user") User user, 
			HttpServletRequest request,  HttpServletResponse response){
		
		System.out.println(user);
		
		userservice.updUser(user);
		
		System.out.println(2222222);
		DWZJsonResponseResult json = DWZJsonResponseResult.initSuccess();
		json.setNavTabId("userList");
		jsonToPage(json.toJSONString(),response);
	}
	
	@RequestMapping("/delUser")
	public void delUser(Integer id, HttpServletResponse response){
		Map<String, Object> param = new HashMap<>();
		param.put("id",id);
		userservice.delUser(param );
	}
	
}
