package com.example.demo.utils;

/**
 * @ClassName ToImageUtil
 * @Description
 * @Author Life
 * @Date 2021/7/3 16:27
 * @Version 1.0
 */


import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

public class ToImageUtil {


    //先将base64转成字节数在

    public static byte[] base64ToByte(String imageBase64) {
        byte[] b = null;
        Base64.Decoder decoder = Base64.getDecoder();
        try {
            if (imageBase64.indexOf("data:image/jpeg;base64,") != -1) {
                b = decoder.decode(imageBase64.replaceAll("data:image/jpeg;base64,", ""));
            } else {
                if (imageBase64.indexOf("data:image/png;base64,") != -1) {
                    b = decoder.decode(imageBase64.replaceAll("data:image/png;base64,", ""));
                } else {
                    b = decoder.decode(imageBase64.replaceAll("data:image/jpg;base64,", ""));
                }
            }
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {// 调整异常数据
                    b[i] += 256;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("byte:"+b);
        return b;

    }



    public static String filePath( byte[] b) {

        String imgPath = null;   //最终返回的图片路径

        try {

            //获取当前时间
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            System.out.println("sdf"+sdf);
            String fileAdd = sdf.format(new Date()); //当前时间
            System.out.println("fileAdd"+fileAdd);
            //图片存储路径
            //如果要存到当前项目路径下就用这个
            //String resourcesPath = new ToImageUtil().getClass().getResource("/static/images/songlist/").getPath();
            String resourcesPath = System.getProperty("user.dir")+"\\src\\main\\resources\\static\\images\\";
            System.out.println("resoursePath"+resourcesPath);
            //做转码,否则存的图片名字会乱码
            resourcesPath = URLDecoder.decode(resourcesPath, "UTF-8");
            System.out.println("path"+resourcesPath);
            //图片名称是  当前日期    避免数据重复
            String fileName = fileAdd  + ".jpg";;
            System.out.println("fileName"+fileName);
            //用于写入的图片路径
            String Path = resourcesPath + fileName;
            System.out.println("path"+Path);
            //如果文件夹不存在则创建
            File file = new File(Path);
            if (!file.exists()) {
                file.createNewFile();
            }
            //将二进制在转换为图片
            OutputStream out = new FileOutputStream(Path);
            out.write(b);
            out.flush();
            out.close();
            imgPath = "../static/images/"+fileName;
        } catch (Exception e) {
            imgPath = null;
            e.printStackTrace();
        }
        return imgPath;
    }

}