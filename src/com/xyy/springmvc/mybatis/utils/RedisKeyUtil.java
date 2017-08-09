package com.xyy.springmvc.mybatis.utils;

import java.util.concurrent.atomic.AtomicInteger;



/**
 * Redis各数据key生成规则
 * 
 * @author xmshen
 */
public class RedisKeyUtil {
	/**
	 * 国际化key
	 * @param id 国际化id
	 * @param language 语言
	 * @return
	 */
	public static String getInternationKey(int id,String language){
		return "i:"+id+language;
	}
	/**
	 * 单个联赛信息key
	 * @param leagueId
	 * @return
	 */
	public static String getLeagueKey(long leagueId){
		return "lg:"+leagueId;
	}
	/**
	 * 单个赛事信息key(match info)
	 * @param matchId
	 * @return
	 */
	public static String getMatchKey(int matchId){
		return "mi:"+matchId;
	}
	/**
	 * 赛事配置key(match config)
	 * @param matchId
	 * @return
	 */
	public static String getMatchCfgKey(int matchId){
		return "mc:"+matchId;
	}
	
	/**
	 * 单个游戏信息key(game info),游戏信息，包含游戏所有不变的信息
	 * @param gameId
	 * @return
	 */
	public static String getGameInfoKey(int gameId){
		return "gi:"+gameId;
	}
	/**
	 * 单个游戏信息key(game info),游戏信息，只包含游戏可变信息（赔率和状�?�?
	 * @param gameId
	 * @return
	 */
	/*public static String getGameInfoKey2(int gameId){
		return "gi2:"+gameId;
	}*/
	
	/**
	 * �?��赛事key集合(match set)
	 * @return
	 */
	public static String getMatchSetKey(){
		return "ms";
	}
	
	public static String getGameSetKey(){
		return "gs";
	}
	/**
	 * 单个赛事下游戏集�?game set of match)
	 * @param matchId
	 * @return
	 */
	public static String getGameSetOfMatch(int matchId){
		return "gsm:"+matchId;
	}
	/**
	 * 第三方赔率key
	 * @param tradeItemId
	 * @return
	 */
	public static String getRatioKey(int tradeItemId){
		return "r:"+tradeItemId;
	}
	
	/**
	 * 用户单赛事�?投注额key(user match amt)
	 * @param userId
	 * @param matchId
	 * @return
	 */
	public static String getUserMatchAmtKey(long userId,int matchId){
		return "uma:"+userId+":"+matchId;
	}
	
	/**
	 * 用户佣金配置key(user config)
	 * @param userId
	 * @param group
	 * @return
	 */
	public static String getUserCommissionKey(long userId,String group){
		return "uc:"+userId+":"+group.toUpperCase();
	}
	
	/**
	 * 用户信息配置key(user info)
	 * @param userId
	 * @return
	 */
	public static String getUserInfoKey(long userId){
		return "ui:"+userId;
	}
	
	/**
	 * 各上级代理在用户身上的占成信�?
	 * @param userid
	 * @param sportid 体育
	 * @param playid 玩法
	 * @param daterange �?全场
	 * @param isroll 单式/滚球
	 * @return
	 */
	public static String getUserPtinfoKey(long userid,int sportid,int playid,int daterange,int isroll){
		return "pi:"+userid+":"+sportid+":"+isroll+"_"+daterange+"_"+playid;
	}
	
	/**
	 * 系统参数key
	 * @param paramKey
	 * @return
	 */
	public static String getSysParam(String paramKey){
		return "sys:"+paramKey;
	}
	
	/**
	 * 有拖单的赛事id集合
	 * @return
	 */
	public static String getDelayOrderMatchSet(){
		return "dm";
	}
	/**
	 * 滚球赛事拖单zset
	 * @param matchId
	 * @return
	 */
	public static String getMatchWaitingOrder(int matchId){
		return "wo:"+matchId;
	}
	
	/**
	 * 滚球已接受注单set(左进右出)
	 * @return
	 */
	public static String getAcceptSet(){
		return "acceptorder";
	}
	
	/**
	 * 滚球取消注单set(左进右出)
	 * 单号:原因
	 * @return
	 */
	public static String getCancelSet(){
		return "cancelorder";
	}
	
	/**
	 * 获取赛事在单�?滚球/早餐界面中预留的行数，由抓取管理中心赋�?
	 * @param matchId
	 * @return
	 */
	public static String getMatchRowNum(int matchId){
		return "mrn:"+matchId;
	}
	
	/**
	 * 获取校验码key
	 * @param uuid
	 * @return
	 */
	public static String getValidCodeKey(String uuid){
		return "vc:"+uuid;
	}
	
	/**
	 * 获取滚球赛事盘中信息，由抓取管理中心存放
	 * @param matchId
	 * @return
	 */
	public static String getMatchReal(int matchId){
		return "mrl:"+matchId;
	}
	
	/**
	 * 操盘系统整合后盘中数据，提供给前端使�?
	 * @param matchId
	 * @return
	 */
	public static String getMatchReal2(int matchId){
		return "mrl2:"+matchId;
	}	
}
