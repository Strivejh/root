package com.xyy.springmvc.mybatis.utils;

public class DWZJsonConstant {

	 /** AJAX操作响应：操作成功 */
   public static final Integer DWZ_JSON_RESULT_SUCCESS = 200;

   /** AJAX操作响应：操作失败 */
   public static final Integer DWZ_JSON_RESULT_FAILED = 300;

   /** AJAX操作响应：超时 */
   public static final Integer DWZ_JSON_RESULT_TIMEOUT = 301;

   /** AJAX操作响应：消息 */
   public static final String DWZ_JSON_MESSAGE = "message";

   /** AJAX操作响应：状态吗 */
   public static final String DWZ_JSON_CODE = "statusCode";
   
   /** AJAX操作响应：回调函数名称 */
   public static final String DWZ_JSON_CLOSE = "closeCurrent";
   
   /** AJAX操作响应：回调函数名称 */
   public static final String DWZ_JSON_CALLBACK = "callbackType";
   
   /** AJAX操作响应：成功 */
   public static final String DWZ_JSON_MESSAGE_SUCCESS = "提交成功";

   /** AJAX操作响应：失败*/
   public static final String DWZ_JSON_MESSAGE_FAIL = "提交失败";
   
   /** 回调页面*/
   public static final String DWZ_JSON_CALLTAB = "navTabId";
}