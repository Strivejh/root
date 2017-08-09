package com.xyy.springmvc.mybatis.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class SystemUtil {

	/***
	 * 得到ip
	 * 
	 * @param String
	 * @return
	 */
	static public String getLocalIP() {
		String ip = "";

		Enumeration<NetworkInterface> netInterfaces = null;
		try {
			netInterfaces = NetworkInterface.getNetworkInterfaces();
			while (netInterfaces.hasMoreElements()) {
				NetworkInterface ni = netInterfaces.nextElement();
				Enumeration<InetAddress> ips = ni.getInetAddresses();
				while (ips.hasMoreElements()) {
					ip = ips.nextElement().getHostAddress();
					if (ip.indexOf(".") > 0 && !ip.equals("127.0.0.1"))
						break;
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return ip;
	}

	/***
	 * 压缩GZip
	 * 
	 * @param data
	 * @return
	 */
	public static String gZip(String input) {
		byte[] bytes = null;
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			GZIPOutputStream gzip = new GZIPOutputStream(bos);
			gzip.write(input.getBytes("utf-8"));
			gzip.finish();
			gzip.close();
			bytes = bos.toByteArray();
			bos.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return new BASE64Encoder().encodeBuffer(bytes);
	}

	/***
	 * 解压GZip
	 * 
	 * @param data
	 * @return
	 */
	public static String unGZip(String input) {
		byte[] bytes = null;
		String out = "";
		ByteArrayInputStream bis = null;
		GZIPInputStream gzip = null;
		ByteArrayOutputStream baos = null;
		try {
			bis = new ByteArrayInputStream(new BASE64Decoder().decodeBuffer(input));
			gzip = new GZIPInputStream(bis);
			byte[] buf = new byte[1024];
			int num = -1;
			baos = new ByteArrayOutputStream();
			while ((num = gzip.read(buf, 0, buf.length)) != -1) {
				baos.write(buf, 0, num);
			}
			bytes = baos.toByteArray();
			baos.flush();
			baos.close();
			baos=null;
			gzip.close();
			gzip=null;
			bis.close();
			bis=null;
			out = new String(bytes, "utf-8");
		} catch (Exception ex) {
			ex.printStackTrace();
		}finally{
			if(null!=baos){
				try {
					baos.close();
					baos = null;
				} catch (IOException e) {
				}
				
			}
			
			if(null != gzip){
				try {
					gzip.close();
					gzip=null;
				} catch (IOException e) {
				}
			}
			
			if(null != bis){
				try {
					bis.close();
					bis=null;
				} catch (IOException e) {
				}
				
			}
			
			
		}
		return out;
	}

}
