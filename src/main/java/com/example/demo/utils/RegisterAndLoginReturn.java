package com.example.demo.utils;

import com.example.demo.VO.UserVO;
import com.example.demo.controller.UserController;

/**
 * @ClassName RegisterAndLoginReturn
 * @Description
 * @Author Life
 * @Date 2021/6/22 17:26
 * @Version 1.0
 */


public class RegisterAndLoginReturn extends UserController {

    private Boolean isSuccessful;
    private String warning;
    private UserVO userVO;

    public RegisterAndLoginReturn(Boolean isSuccessful,String warning,UserVO userVO) {
        this.isSuccessful=isSuccessful;
        this.userVO=userVO;
        this.warning=warning;
    }

    public Boolean getIsSuccessful() {
        return isSuccessful;
    }

    public void setIsSuccessful(Boolean isSuccessful) {
        this.isSuccessful = isSuccessful;
    }

    public String getWarning() {
        return warning;
    }

    public void setWarning(String warning) {
        this.warning = warning;
    }

    public UserVO getUserVO() {
        return userVO;
    }

    public void setUserVO(UserVO userVO) {
        this.userVO = userVO;
    }

    public String toString(){
        return getIsSuccessful()+"  "+getWarning()+"  "+getUserVO().toString();
    }


}

