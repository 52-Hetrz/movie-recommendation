package com.example.demo.controller;

import com.example.demo.VO.AdministratorVO;
import com.example.demo.dao.Administrator;
import com.example.demo.service.impl.AdministratorServiceImpl;
import com.example.demo.utils.RegisterAndLoginReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

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

    @GetMapping("/administratorLogin")
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
}
