package com.xyy.springmvc.mybatis.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Spring容器容器注入组件
 * @author Liu ping
 */
@Component
public class SpringIocUtil implements ApplicationContextAware{

	private static ApplicationContext context;
	
	public void setApplicationContext(ApplicationContext arg0) throws BeansException {
		this.context = arg0;
	}

	public static ApplicationContext getContext(){
		return context;
	}
}
