package com.example.demo.service;

import com.example.demo.dao.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public interface UserService {
    /**
     * 向数据库中插入用户数据
     * @param user 存储用户信息的User类
     * @return 插入正确返回1
     */
    int insertUser(User user);

    /**
     * 根据用户名选择用户的id
     * @param name 用户名
     * @return 该用户id
     */
    Integer searchUserIdByName(String name);

    /**
     * 根据用户id选取用户信息
     * @param id 用户id
     * @return User类：存储该用户信息
     */
    User searchUserById(int id);

    /**
     * 根据用户id查找用户名
     * @param id    用户id
     * @return  String：用户名
     */
    String searchUserNameById(int id);

    /**
     * 根据用户名查找用户的密码
     * @param name 用户名
     * @return String：用户密码
     */
    String searchPasswordByUserName(String name);

    /**
     * 修改密码
     * @param name 用户名
     * @param password 用户修改之后的密码
     */
    void changePassword(String name, String password);

    /**
     * 根据用户id查询用户密码
     * @param id 用户id
     * @return String 用户密码
     */
    String selectPasswordById(int id);

    /**
     * 管理员删除用户账号
     * @param id 用户id
     */
    void deleteUser(int id);

    /**
     * 获取数据库中全部的用户信息
     * @return ArrayList<User>
     */
    ArrayList<User> getAllUsers();
}
