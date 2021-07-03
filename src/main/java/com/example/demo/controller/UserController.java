package com.example.demo.controller;


import com.example.demo.service.impl.RecommendServiceImpl;
import com.example.demo.utils.RegisterAndLoginReturn;
import com.example.demo.VO.UserVO;
import com.example.demo.dao.User;
import com.example.demo.service.impl.CommentServiceImpl;
import com.example.demo.service.impl.MovieServiceImpl;
import com.example.demo.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


/**
 * @ClassName UserController
 * @Description
 * @Author Life
 * @Date 2021/6/22 15:38
 * @Version 1.0
 */

@RestController
public class UserController {

    @Autowired
    UserServiceImpl userService;
    @Autowired
    MovieServiceImpl movieService;
    @Autowired
    CommentServiceImpl commentService;

    @Autowired
    RecommendServiceImpl recommendService;

    /**
     * 用户注册接口
     * @param servletRequest 网络协议请求
     * @return RegisterAndLoginReturn
     */
    @GetMapping("/register")
    public RegisterAndLoginReturn register(HttpServletRequest servletRequest){
        RegisterAndLoginReturn registerAndLoginReturn = new RegisterAndLoginReturn(false, "", (UserVO) null);
        String name = servletRequest.getParameter("name");
        String firstPassword = servletRequest.getParameter("firstPassword");
        String secondPassword = servletRequest.getParameter("secondPassword");
        String mail = servletRequest.getParameter("mail");
        String image = "../static/images/user/user.png";
        if(userService.searchUserIdByName(name)!= null)
            registerAndLoginReturn.setWarning("用户名已存在");
        else{
            int comparePassword = comparePassword(firstPassword, secondPassword);
            if (comparePassword == 2){
                registerAndLoginReturn.setWarning("两次密码输入不一致");
            }else if(comparePassword == 3){
                registerAndLoginReturn.setWarning("输入密码少于六个字符");
            }else{
                userService.insertUser(new User(name, firstPassword, mail, image));
                registerAndLoginReturn.setIsSuccessful(true);
                registerAndLoginReturn.setWarning("登陆成功");
                int id = userService.searchUserIdByName(name);
                registerAndLoginReturn.setUserVO(makeUserVOById(id));
            }
        }
        return registerAndLoginReturn;
    }


    /**
     * 用户登录接口
     * @param httpServletRequest 网络协议请求
     * @return RegisterAndLoginReturn
     */
    @GetMapping("/login")
    public RegisterAndLoginReturn login(HttpServletRequest httpServletRequest){
        String name = httpServletRequest.getParameter("name");
        String password = httpServletRequest.getParameter("password");
        RegisterAndLoginReturn registerAndLoginReturn =
                new RegisterAndLoginReturn(false, "",(UserVO) null);
        if(userService.searchUserIdByName(name) == null){
            registerAndLoginReturn.setWarning("用户名不存在");
        }else{
            String databasePassword = userService.searchPasswordByUserName(name);
            int compareResult = comparePassword(databasePassword, password);
            if(compareResult == 2){
                registerAndLoginReturn.setWarning("密码错误");
            }else {
                registerAndLoginReturn.setIsSuccessful(true);
                registerAndLoginReturn.setUserVO(makeUserVOById(userService.searchUserIdByName(name)));
            }
        }
        return registerAndLoginReturn;
    }

    @GetMapping("/changePassword")
    public RegisterAndLoginReturn changePassword(HttpServletRequest httpServletRequest){
        String name = httpServletRequest.getParameter("name");
        String oldPassword = httpServletRequest.getParameter("oldPassword");
        String firstPassword = httpServletRequest.getParameter("firstPassword");
        String secondPassword = httpServletRequest.getParameter("secondPassword");
        String databasePassword = userService.searchPasswordByUserName(name);
        RegisterAndLoginReturn registerAndLoginReturn =
                new RegisterAndLoginReturn(false, "",(UserVO) null);
        if(userService.searchUserIdByName(name) == null){
            registerAndLoginReturn.setWarning("用户名不存在");
            return registerAndLoginReturn;
        }
        if(!oldPassword.equals(databasePassword)){
            registerAndLoginReturn.setWarning("密码错误");
            return registerAndLoginReturn;
        }else{
            int comparePassword = comparePassword(firstPassword, secondPassword);
            if (comparePassword == 2){
                registerAndLoginReturn.setWarning("两次密码输入不一致");
            }else if(comparePassword == 3){
                registerAndLoginReturn.setWarning("输入密码少于六个字符");
            }else{
                userService.changePassword(name, firstPassword);
                registerAndLoginReturn.setIsSuccessful(true);
                registerAndLoginReturn.setWarning("修改成功");
                int id = userService.searchUserIdByName(name);
                registerAndLoginReturn.setUserVO(makeUserVOById(id));
            }
        }
        return registerAndLoginReturn;
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
            if(firstPassword.length()<6)
                return 3;
            else
                return 1;
        }
    }

    /**
     * 根据用户id返回该用户的VO对象
     * @param userId 用户id
     * @return UserVO类：存储用户前端交互的用户的所有信息
     */
    private UserVO makeUserVOById(int userId){

        return new UserVO(userService.searchUserById(userId),
                movieService.searchCollectMoviesByUserId(userId),
                commentService.searchCommentsByUserId(userId),
                recommendService.getRecommendMovieBySlopeOne(userId,4));
    }

}
