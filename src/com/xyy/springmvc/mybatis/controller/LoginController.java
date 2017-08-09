package com.xyy.springmvc.mybatis.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession; 

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;   
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping; 

import com.xyy.springmvc.mybatis.beans.User;
import com.xyy.springmvc.mybatis.services.ILoginService;
import com.xyy.springmvc.mybatis.utils.CpsysUtil;
import com.xyy.springmvc.mybatis.utils.JsonResponseResult;
import com.xyy.springmvc.mybatis.utils.SysConstant;
 

@Controller
@RequestMapping("/login")
public class LoginController extends BaseController{
	private Logger logger = Logger.getLogger(this.getClass());

	@Resource
	private ILoginService loginServiceImpl;

	 
	 
	
	 
	@RequestMapping("/main")
	public String main(HttpSession httpSession) {
		User user = (User) httpSession
				.getAttribute(SysConstant.USER_SESSION);
		 
		user.setRightCode("");
		httpSession.setAttribute(SysConstant.USER_SESSION, user); 
		return super.toPage("main", "index");
	}

	@RequestMapping("/loginout")
	public String loginout(HttpServletRequest req,HttpServletResponse rep)   {
		HttpSession session =  req.getSession();
		if (session != null) {
			session.invalidate(); 
			try {
				rep.sendRedirect(req.getContextPath()+"/login.jsp");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		// super.jsonResult = "{\"returncode\":0}";
		return null;
	}
 
	 
	
	@RequestMapping("/doLogin")
	public String doLogin(HttpServletRequest request, HttpServletResponse response) { 
		
		String userid = request.getParameter("loginName");
		String password =request.getParameter("userPwd");
		String yzmbox=request.getParameter("yzmbox");
		
		JsonResponseResult json = JsonResponseResult.createSuccess();
		String loginMsg;
		if (StringUtils.isEmpty(yzmbox)
				|| request.getSession().getAttribute("yzmbox") == null) {
			loginMsg = "验证码不能为空！";
			json = JsonResponseResult.createFalied(loginMsg);

			String jsonResult = json.toJSONString();
			jsonToPage(jsonResult, response);
			return null;
		}
		if (!yzmbox.equalsIgnoreCase(request.getSession()
				.getAttribute("yzmbox").toString())) {
			loginMsg = "验证码不正确！";
			json = JsonResponseResult.createFalied(loginMsg);
			String jsonResult = json.toJSONString();
			jsonToPage(jsonResult, response);
			return null;
		}

		userid = userid.trim();
		password = password.trim();

		User user = new User();
		user = loginServiceImpl.doLogin(userid,
				CpsysUtil.getMD5Str(CpsysUtil.getFromBASE64(password)));
		if (user == null) {
			loginMsg = "用户名或密码错误";
			logger.info(loginMsg);
			logger.error(loginMsg);
			json = JsonResponseResult.createFalied(loginMsg);
			String jsonResult = json.toJSONString();
			jsonToPage(jsonResult, response);
			return null;
		}
		user.setUserUTC("GMT+8");// 登录强制GMT+8

		request.getSession().setAttribute(SysConstant.USER_SESSION, user);

		json = JsonResponseResult.createSuccess();
		String jsonResult = json.toJSONString();
		jsonToPage(jsonResult, response);
		return null;
	}
	 

}
