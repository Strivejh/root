package com.xyy.springmvc.mybatis.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 
 * ���������������������صĸ��ֲ���
 * 
 * <p>
 * ���������ڸ�ʽ�������ַ��н�������Ӧ�����ڡ������ڵļӼ�������
 * 
 * @author maluming 2011-4-14
 * @see
 * @since 1.0
 */
public class DateUtil {

	public static final String FMT_YMD = "yyyy-MM-dd";
	
	public static final String FMT_YMDHMS = "yyyy-MM-dd HH:mm:ss";

	/**
	 * �������������ո����ʽ����������
	 * 
	 * @param dateStr String �ַ�������
	 * @param format String ��ʽ
	 * @return Date ����
	 */
	public static Date parseDate(String dateStr, String format) {
		Date date = null;
		try {
			DateFormat dateFormat = new SimpleDateFormat(format);
			String dt = dateStr;
			if ((!dt.equals("")) && (dt.length() < format.length())) {
				dt += format.substring(dt.length()).replaceAll("[YyMmDdHhSs]", "0");
			}
			date = (Date) dateFormat.parse(dt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * ������������ʽ������
	 * 
	 * @param dateStr String �ַ������ڣ�YYYY-MM-DD ��ʽ
	 * @return Date
	 */
	public static Date parseDate(String dateStr) {
		return parseDate(dateStr, "yyyy-MM-dd");
	}
	
	/**
	 * ������������ʽ������
	 * @param year �꣬��λ�����ַ�
	 * @param month ��
	 * @param day ��
	 * @return
	 */
	public static Date parseDate(String year,String month,String day){
		if(year.length()!=4){
			return null;
		}
		if(month.length()==1){
			month = "0"+month;
		}
		if(day.length()==1){
			day = "0"+day;
		}
		String date = year+"-"+month+"-"+day;
		return parseDate(date);
	}
	
	/**
	 * ������������ʽ���������
	 * 
	 * @param date Date ����
	 * @param format String ��ʽ
	 * @return �ַ�������
	 */
	public static String format(Date date, String format) {
		String result = "";
		try {
			if (date != null) {
				DateFormat dateFormat = new SimpleDateFormat(format);
				result = dateFormat.format(date);
			}
		} catch (Exception e) {
		}
		return result;
	}

	/**
	 * �����������������
	 * 
	 * @param date Date ����
	 * @return ���
	 */
	public static int getYear(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.YEAR);
	}

	/**
	 * ���������������·�
	 * 
	 * @param date Date ����
	 * @return �·�
	 */
	public static int getMonth(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.MONTH) + 1;
	}

	/**
	 * ���������������շ�
	 * 
	 * @param date Date ����
	 * @return �շ�
	 */
	public static int getDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * ��������������Сʱ
	 * 
	 * @param date ����
	 * @return ����Сʱ
	 */
	public static int getHour(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.HOUR_OF_DAY);
	}

	/**
	 * �������������ط���
	 * 
	 * @param date ����
	 * @return ���ط���
	 */
	public static int getMinute(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.MINUTE);
	}

	/**
	 * ��������
	 * 
	 * @param date Date ����
	 * @return ��������
	 */
	public static int getSecond(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.SECOND);
	}

	/**
	 * �������������غ���
	 * 
	 * @param date ����
	 * @return ���غ���
	 */
	public static long getMillis(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.getTimeInMillis();
	}

	/**
	 * ���������������ַ�������
	 * 
	 * @param date ����
	 * @return �����ַ������� yyyy-MM-dd ��ʽ
	 */
	public static String getDate(Date date) {
		return format(date, "yyyy-MM-dd");
	}

	/**
	 * ���������������ַ���ʱ��
	 * 
	 * @param date Date ����
	 * @return �����ַ���ʱ�� HH:mm:ss ��ʽ
	 */
	public static String getTime(Date date) {
		return format(date, "HH:mm:ss");
	}

	/**
	 * ���������������ַ�������ʱ��
	 * 
	 * @param date Date ����
	 * @return �����ַ�������ʱ�� yyyy/MM/dd HH:mm:ss ��ʽ
	 */
	public static String getDateTime(Date date) {
		return format(date, "yyyy/MM/dd HH:mm:ss");
	}
	
	public static String toDateStr(Date date,String format) {
		return format(date, format);
	}

	/**
	 * �����������������
	 * 
	 * @param date Date ����
	 * @param day int ����
	 * @return ������Ӻ������
	 */
	public static Date addDate(Date date, int day) {
		Calendar calendar = Calendar.getInstance();
		long millis = getMillis(date) + ((long) day) * 24 * 3600 * 1000;
		calendar.setTimeInMillis(millis);
		return calendar.getTime();
	}
	
	public static Date addHours(Date date,int hours){
		Calendar calendar = Calendar.getInstance();
		long millis = getMillis(date) + ((long) hours) * 3600 * 1000;
		calendar.setTimeInMillis(millis);
		return calendar.getTime();
	}
	
	/**
	 * �����������������
	 * 
	 * @param date Date ����
	 * @param date1 Date ����
	 * @return ��������������
	 */
	public static int diffDate(Date date, Date date1) {
		return (int) ((getMillis(date) - getMillis(date1)) / (24 * 3600 * 1000));
	}
	/**
	 * ʱ������Сʱ��
	 * @param date
	 * @param date1
	 * @return
	 */
	public static int diffHours(Date date, Date date1) {
		return (int) ((getMillis(date) - getMillis(date1)) / (3600 * 1000));
	}
	
	public static int diffMinutes(Date date, Date date1) {
		return (int) ((getMillis(date) - getMillis(date1)) / (60 * 1000));
	}

	/**
	 * ����������ȡ��ָ���·ݵĵ�һ��
	 * 
	 * @param strdate String �ַ�������
	 * @return String yyyy-MM-dd ��ʽ
	 */
	public static String getMonthBegin(String strdate) {
		Date date = parseDate(strdate);
		return format(date, "yyyy-MM") + "-01";
	}

	/**
	 * ����������ȡ��ָ���·ݵ����һ��
	 * 
	 * @param strdate String �ַ�������
	 * @return String �����ַ� yyyy-MM-dd��ʽ
	 */
	public static String getMonthEnd(String strdate) {
		Date date = parseDate(getMonthBegin(strdate));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, 1);
		calendar.add(Calendar.DAY_OF_YEAR, -1);
		return formatDate(calendar.getTime());
	}

	/**
	 * �������������õĸ�ʽ������
	 * 
	 * @param date Date ����
	 * @return String �����ַ� yyyy-MM-dd��ʽ
	 */
	public static String formatDate(Date date) {
		return formatDateByFormat(date, "yyyy-MM-dd");
	}

	/**
	 * ������������ָ���ĸ�ʽ����ʽ������
	 * 
	 * @param date Date ����
	 * @param format String ��ʽ
	 * @return String �����ַ�
	 */
	public static String formatDateByFormat(Date date, String format) {
		String result = "";
		if (date != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat(format);
				result = sdf.format(date);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * ����2������֮����������
	 * 
	 * @param d1 ����1
	 * @param d2 ����2
	 * @return ����1������2�������
	 */
	public int getDaysBetween(Calendar d1, Calendar d2) {
		if (d1.after(d2)) {
			// swap dates so that d1 is start and d2 is end
			Calendar swap = d1;
			d1 = d2;
			d2 = swap;
		}
		int days = d2.get(Calendar.DAY_OF_YEAR) - d1.get(Calendar.DAY_OF_YEAR);
		int y2 = d2.get(Calendar.YEAR);
		if (d1.get(Calendar.YEAR) != y2) {
			d1 = (Calendar) d1.clone();
			do {
				days += d1.getActualMaximum(Calendar.DAY_OF_YEAR);
				d1.add(Calendar.YEAR, 1);
			} while (d1.get(Calendar.YEAR) != y2);
		}
		return days;
	}

	/**
	 * ����2������֮��Ĺ�������ȥ���������գ�
	 * 
	 * @param d1 ����1
	 * @param d2 ����2
	 * @return ����1������2֮��Ĺ�������
	 */
	public int getWorkingDay(Calendar d1, Calendar d2) {
		int result = -1;
		if (d1.after(d2)) {
			// swap dates so that d1 is start and d2 is end
			Calendar swap = d1;
			d1 = d2;
			d2 = swap;
		}

		// int betweendays = getDaysBetween(d1, d2);

		// int charge_date = 0;

		// ��ʼ���ڵ�����ƫ����
		int charge_start_date = 0;
		// �������ڵ�����ƫ����
		int charge_end_date = 0;

		int stmp;
		int etmp;
		stmp = 7 - d1.get(Calendar.DAY_OF_WEEK);
		etmp = 7 - d2.get(Calendar.DAY_OF_WEEK);

		// ���ڲ���ͬһ��������
		if (stmp != 0 && stmp != 6) {// ��ʼ����Ϊ�������������ʱƫ����Ϊ0
			charge_start_date = stmp - 1;
		}
		if (etmp != 0 && etmp != 6) {// ��������Ϊ�������������ʱƫ����Ϊ0
			charge_end_date = etmp - 1;
		}
		// }
		result = (getDaysBetween(this.getNextMonday(d1), this.getNextMonday(d2)) / 7) * 5 + charge_start_date - charge_end_date;
		// System.out.println("charge_start_date>" + charge_start_date);
		// System.out.println("charge_end_date>" + charge_end_date);
		// System.out.println("between day is-->" + betweendays);
		return result;
	}

	/**
	 * ��ȡ��ǰ����
	 * 
	 * @param date ��ǰ����
	 * @return ��ǰ����
	 */
	public String getChineseWeek(Calendar date) {
		final String dayNames[] = {"������", "����һ", "���ڶ�", "������", "������", "������", "������"};

		int dayOfWeek = date.get(Calendar.DAY_OF_WEEK);

		// System.out.println(dayNames[dayOfWeek - 1]);
		return dayNames[dayOfWeek - 1];

	}

	/**
	 * ������ڵ���һ������һ������
	 * 
	 * @param date
	 * @return
	 */
	public Calendar getNextMonday(Calendar date) {
		Calendar result = null;
		result = date;
		do {
			result = (Calendar) result.clone();
			result.add(Calendar.DATE, 1);
		} while (result.get(Calendar.DAY_OF_WEEK) != 2);
		return result;
	}

	/**
	 * ������������֮��ķǹ���������
	 * 
	 * @param d1 ����1
	 * @param d2 ����2
	 * @return ����1������2֮��ķǹ�������
	 */
	public int getHolidays(Calendar d1, Calendar d2) {
		return this.getDaysBetween(d1, d2) - this.getWorkingDay(d1, d2);

	}

	/**
	 * ������תΪ����
	 * @param timeMills
	 * @param format
	 * @return
	 */
	public static String getDateStr(long timeMills,String format){
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(timeMills);
		return formatDateByFormat(cal.getTime(),format);
	}
	
}
