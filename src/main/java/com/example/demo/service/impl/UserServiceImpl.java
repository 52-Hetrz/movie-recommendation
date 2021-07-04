package com.example.demo.service.impl;

import com.example.demo.controller.UserController;
import com.example.demo.dao.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


/**
 * @ClassName UserServiceImpl
 * @Description
 * @Author Life
 * @Date 2021/6/22 15:36
 * @Version 1.0
 */

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public int insertUser(User user) {
        return userMapper.insertUser(user);
    }

    @Override
    public Integer searchUserIdByName(String name){
        return userMapper.selectUserIdByName(name);
    }

    @Override
    public User searchUserById(int id){
        return userMapper.selectUserById(id);
    }

    @Override
    public String searchUserNameById(int id) {
        return userMapper.selectUserNameById(id);
    }

    @Override
    public String searchPasswordByUserName(String name) {
        return userMapper.selectPasswordByUserName(name);
    }

    @Override
    public void changePassword(String name, String password) {
        userMapper.changePassword(name, password);
    }

    @Override
    public String selectPasswordById(int id) {
        return userMapper.selectPasswordById(id);
    }

    @Override
    public void deleteUser(int id) {
        userMapper.deleteUser(id);
    }

    @Override
    public ArrayList<User> getAllUsers() {
        return userMapper.selectAllUsers();
    }
}
