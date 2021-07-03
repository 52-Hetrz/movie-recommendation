package com.example.demo.service;

import com.example.demo.dao.Administrator;
import org.springframework.stereotype.Service;

@Service
public interface AdministratorService {

    /**
     * 根据管理员的名称搜索管理员密码
     * @param name 管理员用户名
     * @return String：管理员密码
     */
    Administrator selectAdministratorByName(String name);
}
