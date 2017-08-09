package com.xyy.springmvc.mybatis.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;

/**
 *Controller基类，所有后续开发的Controller都必须继承这个基类
 */
@Controller
public class BaseController{


	private static Logger logger = Logger.getLogger(BaseController.class
			.getName());
	
	/*
	 * 跳转到WEB-INF/content/下的某个文件夹下的jsp页面
	 * folder ： 文件夹名
	 * jspPage ：  目标jsp页面名，不带扩展名
	 * */
	protected String toPage(String folder , String jspPage){

		return  (folder+'/'+jspPage); 
	}
	
	protected void jsonToPage(String jsonResult , HttpServletResponse response){

		response.setContentType("application/json;charset=UTF-8");
		// 获取jsonResult并发送响应
		PrintWriter out;
		try {
			out = response.getWriter();
			out.println(jsonResult);
			out.flush();
			out.close();
		} catch (IOException e) {
			logger.error("输出失败", e);
		}
	}
	
}
