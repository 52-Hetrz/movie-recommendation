package com.example.demo.service.impl;

import com.example.demo.dao.Administrator;
import com.example.demo.mapper.AdministratorMapper;
import com.example.demo.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName AdministratorServiceImpl
 * @Description
 * @Author Life
 * @Date 2021/7/3 14:56
 * @Version 1.0
 */

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    AdministratorMapper administratorMapper;

    @Override
    public Administrator selectAdministratorByName(String name) {
        return administratorMapper.selectAdministratorByName(name);
    }
}
