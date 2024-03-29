package com.example.demo.controller;

import com.example.demo.VO.AdministratorVO;
import com.example.demo.dao.Administrator;
import com.example.demo.dao.Comment;
import com.example.demo.dao.Movie;
import com.example.demo.dao.User;
import com.example.demo.service.impl.*;
import com.example.demo.utils.RegisterAndLoginReturn;
import com.example.demo.utils.ToImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;

/**
 * @ClassName AdministratorController
 * @Description
 * @Author Life
 * @Date 2021/7/3 14:57
 * @Version 1.0
 */

@RestController
public class AdministratorController {
    @Autowired
    AdministratorServiceImpl administratorService;

    @Autowired
    MovieServiceImpl movieService;

    @Autowired
    MovieClassificationServiceImpl movieClassificationService;

    @Autowired
    CommentServiceImpl commentService;

    @Autowired
    UserServiceImpl userService;

    @GetMapping("/administrator/login")
    public RegisterAndLoginReturn administratorLogin(HttpServletRequest httpServletRequest){
        String name = httpServletRequest.getParameter("name");
        String password = httpServletRequest.getParameter("password");
        Administrator administrator = administratorService.selectAdministratorByName(name);
        RegisterAndLoginReturn registerAndLoginReturn =
                new RegisterAndLoginReturn(false, "", (AdministratorVO) null);
        if(administrator == null){
            registerAndLoginReturn.setWarning("用户名不存在");
        }else{
            String databasePassword = administrator.getPassword();
            int compareResult = comparePassword(databasePassword, password);
            if(compareResult == 2){
                registerAndLoginReturn.setWarning("密码错误");
            }else {
                registerAndLoginReturn.setIsSuccessful(true);
                registerAndLoginReturn.setAdministratorVO(
                        new AdministratorVO(administrator.getId(), administrator.getName()));
            }
        }
        return registerAndLoginReturn;
    }

    @PostMapping("/administrator/insertMovie")
    void insertMovie(HttpServletRequest httpServletRequest, @RequestParam("image") String image)  {
        String name = httpServletRequest.getParameter("name");
        String area = httpServletRequest.getParameter("area");
        String introduction = httpServletRequest.getParameter("introduction");
        String director = httpServletRequest.getParameter("director");
        String actor = httpServletRequest.getParameter("actor");
        String publish_year = httpServletRequest.getParameter("publish_year");
        String time = httpServletRequest.getParameter("time");
        String type = httpServletRequest.getParameter("type");
        //String imagePath = httpServletRequest.getParameter("image");
        String imagePath = ToImageUtil.filePath(ToImageUtil.base64ToByte(image));
        String mv = "//";
        movieService.insertMovie(
                new Movie(name,area,introduction,director,
                actor, publish_year, time,type, imagePath, mv));
    }

    @GetMapping("/administrator/deleteMovie")
    void deleteMovie(HttpServletRequest httpServletRequest){
        String movieid = httpServletRequest.getParameter("movieid");
        String adminid = httpServletRequest.getParameter("adminid");
        movieService.deleteMovieById(Integer.parseInt(movieid));
    }


    @GetMapping("/administrator/deleteComment")
    public void deleteComment(HttpServletRequest httpServletRequest){
        int adminid = Integer.parseInt(httpServletRequest.getParameter("adminid"));
        int commentid = Integer.parseInt(httpServletRequest.getParameter("commentid"));
        commentService.deleteComment(commentid);
    }

    @GetMapping("/administrator/deleteUser")
    public void deleteUser(HttpServletRequest httpServletRequest){
        int adminid = Integer.parseInt(httpServletRequest.getParameter("adminid"));
        int userid = Integer.parseInt(httpServletRequest.getParameter("userid"));
        userService.deleteUser(userid);
    }

    @GetMapping("/administrator/getAllMovies")
    public ArrayList<Movie> getAllMovies(){
        return movieService.geyAllMovies();
    }

    @GetMapping("/administrator/getAllUsers")
    public ArrayList<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/administrator/getAllComments")
    public ArrayList<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @PostMapping("/administrator/updateMovie")
    public void updateMovie(HttpServletRequest httpServletRequest){
        String id = httpServletRequest.getParameter("id");
        System.out.println(id);
        String name =httpServletRequest.getParameter("name");
        System.out.println(name);
        String area = httpServletRequest.getParameter("area");
        String introduction = httpServletRequest.getParameter("introduction");
        String director = httpServletRequest.getParameter("director");
        String actor = httpServletRequest.getParameter("actor");
        String publish_year = httpServletRequest.getParameter("publish_year");
        String time = httpServletRequest.getParameter("time");
        String type = httpServletRequest.getParameter("type");
        Movie databaseMovie = movieService.selectDatabaseMovieById(Integer.parseInt(id));
        String imagePath = databaseMovie.getImage();
        System.out.println(area);
        System.out.println(introduction);
        System.out.println(director);
        System.out.println(actor);
        System.out.println(publish_year);
        System.out.println(time);
        System.out.println(type);
        Float score = databaseMovie.getScore();
        String mv = "//";
        movieService.updateMovie(new Movie(Integer.parseInt(id),
                name,area, introduction,director, actor, publish_year, score,
                time, type, imagePath, mv));

    }


    /**
     * 检测两次输入的密码是否合法
     * @param firstPassword 第一次输入的密码
     * @param secondPassword 第二次输入的密码
     * @return  1：输入合法
     *          2：两次密码不一致
     *          3：输入密码一致，但长度小于6个字符
     */
    private int comparePassword(String firstPassword, String secondPassword){
        if(!firstPassword.equals(secondPassword)){
            return 2;
        }else{
            if(firstPassword.length()<6){
                return 3;
            }
            else{
                return 1;
            }
        }
    }
}
