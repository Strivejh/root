package com.xyy.springmvc.mybatis.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;  
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
 

 
/**
 * 
 * 生成随机的验证码
 * 〈功能详细描述〉 
 * @see       [相关类/方法]
 * @since     114 v1.0
 */
@Controller
@RequestMapping("verifyCodeGenerator")
public class VerifyCodeGeneratorController 
{

    /**
     * 属性serialVersionUID
     */
    @SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
    
    private Logger logger = Logger.getLogger(VerifyCodeGeneratorController.class.getName());

    private static final VerifyCodeGeneratorController generator = new VerifyCodeGeneratorController();

    private static final String ATTRIBUTE_NAME = "yzmbox";
        // 设置备选验证码:包括"a-z"和数字"0-9" 

    private final String  s = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789"; 

    private Random random = new Random();

    public static VerifyCodeGeneratorController getInstance()
    {
        return generator;
    }

    /** 
     * 生成随机颜色 
     * @param ll 产生颜色值下限(lower limit) 
     * @param ul 产生颜色值上限(upper limit) 
     * @return 生成的随机颜色对象 
     */
    private Color getRandColor(int ll, int ul)
    {
        if (ll > 255)
            ll = 255;
        if (ll < 1)
            ll = 1;
        if (ul > 255)
            ul = 255;
        if (ul < 1)
            ul = 1;
        if (ul == ll)
            ul = ll + 1;
        int r = random.nextInt(ul - ll) + ll;
        int g = random.nextInt(ul - ll) + ll;
        int b = random.nextInt(ul - ll) + ll;
        Color color = new Color(r, g, b);
        return color;
    }

    

    /** 
     * 将验证码的图像输出 
     * @param request 用户的请求对象 
     * @param response 用户的响应对象 
     * */
	@RequestMapping("/printImage")
    public void printImage(HttpServletRequest request, HttpServletResponse response)
    {

        
        int width = 66;//138;//验证码图片宽度 
        int height = 26;//验证码图片高度 
        BufferedImage image = new BufferedImage(width, height,
            BufferedImage.TYPE_3BYTE_BGR);
        Graphics g = image.getGraphics();
        Random random = new Random();//创建一个随机类 
        g.setColor(getRandColor(200, 250));//背景颜色要偏淡 
        g.fillRect(0, 0, width, height);//画背景 
        g.setColor(getRandColor(0, 255));//边框颜色 
        g.drawRect(0, 0, width - 1, height - 1);//画边框 
        g.setColor(getRandColor(160, 200));// 随机产生5条干扰线，使图象中的认证码不易被其它程序探测到 
        for (int i = 0; i < 8; i++ )
        {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            int x1 = random.nextInt(width);
            int y1 = random.nextInt(height);
            g.drawLine(x, y, x1, y1);
        }
        g.setColor(getRandColor(160, 200));// 随机产生100点，使图象中的认证码不易被其它程序探测到 
        for (int i = 0; i < 100; i++ )
        {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            g.drawLine(x, y, x, y);
        }
        Font font = new Font("Times New Roman", Font.CENTER_BASELINE, 20); // 创建字体，字体的大小应该根据图片的高度来定。 
        g.setFont(font);//设置字体 
        int length = 4 ;//+  random.nextInt(6); // 设置默认生成4-10个验证码 
        String sRand = "";

        // 用随机产生的颜色将验证码绘制到图像中。 
        // 生成随机颜色(因为是做前景，所以偏深)   
        //调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成 
        g.setColor(new Color(20 + random.nextInt(110),
            20 + random.nextInt(110), 20 + random.nextInt(110)));
        for (int i = 0; i < length; i++ )
        {
            String ch = String.valueOf(s.charAt(random.nextInt(s.length())));
            sRand += ch;
            g.drawString(ch, 13 * i + 6, 15);
        }
        
        //将生成的字符串存储在session中 
        HttpSession session = request.getSession();
        session.setAttribute(ATTRIBUTE_NAME, sRand.toString());
        g.dispose();//图像生效 
        //禁止图像缓存 
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/jpeg");
        //创建二进制的输出流 
        ServletOutputStream sos = null;
        try
        {
            sos = response.getOutputStream();
            ImageIO.write(image, "jpeg", sos);
            sos.flush();
        }
        catch (IOException e)
        {
        	logger.error("输出验证码失败:" + e.getMessage());
        }
        finally
        {
            try
            {
                if (sos != null)
                    sos.close();
            }
            catch (IOException e)
            {
                logger.error("输出验证码失败:" + e.getMessage());
            }
        }
    }

    /** 
     * 检查输入的验证码是否正确，若用户输入的验证码与生成的验证码相符则返回true，否则返回false。 
     * @param request 用户的请求对象 
     * @return 验证结果 
     * */
    public static boolean check(HttpServletRequest request)
    {
        if ( ((String)request.getParameter(ATTRIBUTE_NAME))
            .equalsIgnoreCase((String)request.getSession().getAttribute(
                ATTRIBUTE_NAME)))
        {
            request.getSession().removeAttribute(ATTRIBUTE_NAME);
            return true;
        }
        return false;
    }
}
