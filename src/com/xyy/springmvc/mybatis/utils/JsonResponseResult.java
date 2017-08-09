package com.xyy.springmvc.mybatis.utils;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;

/**
 * JSON结果返回�?
 * 
 * @author jqjia
 * @version 2011-05-27
 */
public class JsonResponseResult
{
    /** AJAX操作响应：操作成�?*/
    private static final Integer JSON_RESULT_SUCCESS = 0;

    /** AJAX操作响应：操作失�?*/
    private static final Integer JSON_RESULT_FAILED = 1;

    @JSONField
    private long timestamp ;
    
    @JSONField
    private final List<Object> data = new ArrayList<Object>();
    
    @JSONField
    private Object obj;
    
    /** 状�? */
    @JSONField
    private Integer returncode;

    /** 错误信息描述 */
    @JSONField
    private String errmsg;

    /** 响应的HTML代码 */
    @JSONField
    private String html;

    public Integer getReturncode()
    {
        return returncode;
    }

    protected JsonResponseResult()
    {

    }

    private JsonResponseResult(final Integer returncode, final String errmsg)
    {
        super();
        this.returncode = returncode;
        this.errmsg = errmsg;
    }

    /**
     * 创建成功的JsonResult对象�?
     * 
     * @return
     */
    public static JsonResponseResult createSuccess()
    {
        final JsonResponseResult jsonResult = new JsonResponseResult(
                JsonResponseResult.JSON_RESULT_SUCCESS, null);
        return jsonResult;
    }
    
    /**
     * 创建成功的JsonResult对象�?
     * @param 成功提示信息
     * 
     * @return
     */
    public static JsonResponseResult createSuccess(String msg)
    {
    	final JsonResponseResult jsonResult = new JsonResponseResult(
    			JsonResponseResult.JSON_RESULT_SUCCESS, msg);
    	return jsonResult;
    }

    /**
     * 创建失败的JsonResult对象�?
     * 
     * @return
     */
    public static JsonResponseResult createFalied(final String msg)
    {
        final JsonResponseResult jsonResult = new JsonResponseResult(
                JsonResponseResult.JSON_RESULT_FAILED, msg);
        return jsonResult;
    }

    public void setReturncode(final Integer returncode)
    {
        this.returncode = returncode;
    }

    public String getErrmsg()
    {
        return errmsg;
    }

    public void setErrmsg(final String errmsg)
    {
        this.errmsg = errmsg;
    }

    public List<Object> getData()
    {
        return data;
    }

    public void addData(final Object obj)
    {
        data.add(obj);
    }
    
    public String getHtml()
    {
        return html;
    }

    public void setHtml(String html)
    {
        this.html = html;
    }

    @SuppressWarnings("unchecked")
    public void addDataAll(List list)
    {
        data.addAll(list);
    }

    public String toJSONString(){
    	return JSON.toJSONString(this);
    }

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}
}
