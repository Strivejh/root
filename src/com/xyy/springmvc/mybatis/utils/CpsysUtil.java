package com.xyy.springmvc.mybatis.utils;

import java.math.BigDecimal;
import java.security.MessageDigest;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;


/**
 * 交易系统工具类
 * 
 * @author xmshen
 */
public class CpsysUtil {
	private static Log logger = LogFactory.getLog(CpsysUtil.class.getName());
	/** 
	  * MD5 加密 
	  * 加密过程： 
	  * 
	  * 1，使用base64加密
	  * 2，使用MD5加密 
	  * 3,反转加密字符串
	  *
    */  
	public static String getMD5Str(String str) {
		//首先BASE64 加密
		BASE64Encoder encoder= new BASE64Encoder();
		MessageDigest messageDigest = null;
		try {
			//BASE64加密
			str=encoder.encode( str.getBytes("UTF-8"));
			//MD5 加密
			messageDigest = MessageDigest.getInstance("MD5");
			messageDigest.reset();
			messageDigest.update(str.getBytes("UTF-8"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		byte[] byteArray = messageDigest.digest();
		StringBuffer md5StrBuff = new StringBuffer();
		for (int i = 0; i < byteArray.length; i++) {
			if (Integer.toHexString(0xFF & byteArray[i]).length() == 1){
				md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));
			}
			else{
				md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
			}
		}
		// 返回反转加密字符串，
		return md5StrBuff.reverse().toString().trim();
	}
	
	
	// 将 s 进行 BASE64 编码
	public static String getBASE64(String s) {
		if (s == null){
			return null;
		}
		return (new sun.misc.BASE64Encoder()).encode(s.getBytes());
	}

	// 将 BASE64 编码的字符串 s 进行解码
	public static String getFromBASE64(String s) {
		if (s == null){
			return null;
		}
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			byte[] b = decoder.decodeBuffer(s);
			return new String(b);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 按四舍五入格式化浮点小数，保留两位小数点，四舍五入
	 * 
	 * @param num
	 * @return
	 */
	public static float formatFloat(float num) {
		BigDecimal bigDecimal = new BigDecimal(num);		
		return bigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();	
	}
	
	/**
	 * 根据出入条件格式化浮点小数，保留两位小数点（第三位小数要么进一位，要么舍掉）
	 * 
	 * @param num
	 *            需要格式化的数值
	 * @param isCeil
	 *            小数位是否进1位处理
	 * @return 精度为两位小数的数值 xxx.xx
	 */
	public static float formatFloat(float num, boolean isCeil) {
		if (isCeil) {
			return ((float) Math.ceil((num) * 100) / 100.0f);
		} else {
			return ((float) Math.floor((num) * 100) / 100.0f);
		}
	}

	/**
	 * 格式化双精度小数，保留两位小数点，四舍五入
	 * 
	 * @param num
	 * @return 精度为两位小数的数值 xxx.xx
	 */
	public static double formatDouble(double num) {
		BigDecimal bigDecimal = new BigDecimal(num);		
		return bigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();		
	}

	/**
	 * 比较两个Double型数值的大小，小数位精确到两位比较
	 * 
	 * @param a
	 *            比较的数值1
	 * @param b
	 *            比较的数值2
	 * @return 若a大于b，返回1；若a小于b返回-1；a、b相等返回0
	 */
	public static int compareDouble(double a, double b) {
		if (CpsysUtil.formatDouble(a) > CpsysUtil.formatDouble(b)) {
			return 1;
		} else if (CpsysUtil.formatDouble(a) < CpsysUtil.formatDouble(b)) {
			return -1;
		} else {
			return 0;
		}
	}
	
	/**
	 * 计算赛事过期时间(多少分钟后过期)
	 * @param startDate 开赛时间(GMT 0)
	 * @return
	 */
	public static long matchTimeOut(String startDate){
		Calendar nd = Calendar.getInstance();
		String s = TimeZoneUtils.convertTimeZone(startDate, "GMT0", nd.getTimeZone().getID(), "yyyy-MM-dd HH:mm:ss");
		Date d = DateUtil.parseDate(s, "yyyy-MM-dd HH:mm:ss");		
		return DateUtil.diffMinutes(d,nd.getTime())+SysConstant.MATCH_TIMEOUT*60;
	}
	public static void main(String[] args) {
		System.out.println(new CpsysUtil().getMD5Str("321"));;
		
		/*Calendar nd = Calendar.getInstance();
		Date startDate  = new Date();
		String s = TimeZoneUtils.convertTimeZone(startDate, "GMT0", nd.getTimeZone().getID(), "yyyy-MM-dd HH:mm:ss");
		Date d = DateUtil.parseDate(s, "yyyy-MM-dd HH:mm:ss");		
		System.out.println(DateUtil.diffMinutes(d,nd.getTime()));*/
	}
	
}
