package com.xyy.springmvc.mybatis.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.alibaba.fastjson.JSON;

/**
 * @ClassName: DWZJsonResponseResult
 * @Description: DWZ的返回响应
 * @author chenjk
 * @date 2014-9-24 下午2:51:37
 * 
 */
public class DWZJsonResponseResult {

	/** 状态 */
	private Integer statusCode;

	/** 错误信息描述 */
	private String message;

	/** 回调函数名称 */
	private String callbackType;

	/** 回调函数名称 */
	private String navTabId;

	private DWZJsonResponseResult() {
	}

	private String loginUrl;

	private String html;

	private long time;

	/** 需要返回的数据 */
	private final List<Object> data = new ArrayList<Object>();

	@SuppressWarnings("unchecked")
	public void addDataAll(List list) {
		data.addAll(list);
	}

	public Integer getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(Integer statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getCallbackType() {
		return callbackType;
	}

	public void setCallbackType(String callbackType) {
		this.callbackType = callbackType;
	}

	public String getNavTabId() {
		return navTabId;
	}

	public void setNavTabId(String navTabId) {
		this.navTabId = navTabId;
	}

	/**
	 * 创建成功的JsonResult对象。
	 * 
	 * @return
	 */
	public static String createSuccess() {
		StringBuffer sb = new StringBuffer();
		// "{\"message\":\"新增成功\",\"statusCode\":\"200\"}";
		sb.append("{\"").append(DWZJsonConstant.DWZ_JSON_MESSAGE)
				.append("\":\"")
				.append(DWZJsonConstant.DWZ_JSON_MESSAGE_SUCCESS)
				.append("\",\"").append(DWZJsonConstant.DWZ_JSON_CODE)
				.append("\":\"")
				.append(DWZJsonConstant.DWZ_JSON_RESULT_SUCCESS).append("\"}");
		return sb.toString();
	}

	/**
	 * 创建成功的JsonResult对象。
	 * 
	 * @return
	 */
	public static String createSuccessClose() {
		StringBuffer sb = new StringBuffer();
		// "{\"message\":\"新增成功\",\"statusCode\":\"200\"}";
		sb.append("{\"").append(DWZJsonConstant.DWZ_JSON_MESSAGE)
				.append("\":\"")
				.append(DWZJsonConstant.DWZ_JSON_MESSAGE_SUCCESS)
				.append("\",\"").append(DWZJsonConstant.DWZ_JSON_CODE)
				.append("\":\"")
				.append(DWZJsonConstant.DWZ_JSON_RESULT_SUCCESS)
				.append("\",\"").append(DWZJsonConstant.DWZ_JSON_CALLBACK)
				.append("\":\"").append(DWZJsonConstant.DWZ_JSON_CLOSE)
				.append("\"}");
		return sb.toString();
	}

	/**
	 * 创建成功的JsonResult对象。
	 * 
	 * @return
	 */
	public static String createSuccessClose(String msg) {
		StringBuffer sb = new StringBuffer();
		// "{\"message\":\"新增成功\",\"statusCode\":\"200\"}";
		sb.append("{\"").append(DWZJsonConstant.DWZ_JSON_MESSAGE)
				.append("\":\"").append(msg).append("\",\"")
				.append(DWZJsonConstant.DWZ_JSON_CODE).append("\":\"")
				.append(DWZJsonConstant.DWZ_JSON_RESULT_SUCCESS)
				.append("\",\"").append(DWZJsonConstant.DWZ_JSON_CALLBACK)
				.append("\":\"").append(DWZJsonConstant.DWZ_JSON_CLOSE)
				.append("\"}");
		return sb.toString();
	}

	/**
	 * 创建成功的JsonResult对象。
	 * 
	 * @return
	 */
	public static String createSuccess(String msg) {
		StringBuffer sb = new StringBuffer();
		// "{\"message\":\"新增成功\",\"statusCode\":\"200\"}";
		sb.append("{\"").append(DWZJsonConstant.DWZ_JSON_MESSAGE)
				.append("\":\"").append(msg).append("\",\"")
				.append(DWZJsonConstant.DWZ_JSON_CODE).append("\":\"")
				.append(DWZJsonConstant.DWZ_JSON_RESULT_SUCCESS).append("\"}");
		return sb.toString();
	}

	/**
	 * 创建成功的JsonResult对象。
	 * 
	 * @return
	 */
	public static DWZJsonResponseResult initSuccess() {
		DWZJsonResponseResult json = new DWZJsonResponseResult();
		json.setCallbackType(DWZJsonConstant.DWZ_JSON_CLOSE);
		json.setStatusCode(DWZJsonConstant.DWZ_JSON_RESULT_SUCCESS);
		json.setMessage(DWZJsonConstant.DWZ_JSON_MESSAGE_SUCCESS);
		return json;
	}

	/**
	 * 创建失败的JsonResult对象。
	 * 
	 * @return
	 */
	public static String createFalied(final String msg) {
		StringBuffer sb = new StringBuffer();
		// "{\"message\":\"新增成功\",\"statusCode\":\"200\"}";
		sb.append("{\"").append(DWZJsonConstant.DWZ_JSON_MESSAGE)
				.append("\":\"").append(msg).append("\",\"")
				.append(DWZJsonConstant.DWZ_JSON_CODE).append("\":\"")
				.append(DWZJsonConstant.DWZ_JSON_RESULT_FAILED).append("\"}");
		return sb.toString();
	}

	/**
	 * 创建失败的JsonResult对象。
	 * 
	 * @return
	 */
	public static String createFalied() {
		StringBuffer sb = new StringBuffer();
		// "{\"message\":\"新增成功\",\"statusCode\":\"200\"}";
		sb.append("{\"").append(DWZJsonConstant.DWZ_JSON_MESSAGE)
				.append("\":\"").append(DWZJsonConstant.DWZ_JSON_MESSAGE_FAIL)
				.append("\",\"").append(DWZJsonConstant.DWZ_JSON_CODE)
				.append("\":\"").append(DWZJsonConstant.DWZ_JSON_RESULT_FAILED)
				.append("\"}");
		return sb.toString();
	}

	public String toJSONString() {
		return JSON.toJSONString(this);
	}

	public static String toJSONString(DWZJsonResponseResult res) {
		return JSON.toJSONString(res);
	}

	public void addData(final Object obj) {
		data.add(obj);
	}

	public List<Object> getData() {
		return data;
	}

	public String getLoginUrl() {
		return loginUrl;
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public static void main(String args[]) {
		System.out.println(DWZJsonResponseResult.createSuccess());
		System.out.println(DWZJsonResponseResult.createSuccessClose());
		List<String> ll = new ArrayList<String>();
		ll.add("失败了吗？？？");
		DWZJsonResponseResult d = new DWZJsonResponseResult();

		d.setCallbackType("cccc");
		d.setMessage("失败了");
		d.setStatusCode(301);
		d.addDataAll(ll);

		System.out.println(createSuccessClose("关闭页面"));

		HashMap<String, String> m = JSON.parseObject(
				createSuccessClose("关闭页面"), HashMap.class);
		System.out.println(m);
		String str = JSON.toJSONString(d);
		System.out.println(d.toJSONString());
		System.out.println(DWZJsonResponseResult.toJSONString(d));
	}
}
