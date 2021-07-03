package com.example.demo.mapper;

import com.example.demo.dao.Administrator;
import org.apache.ibatis.annotations.Mapper;

/**
 * @ClassName AdministratorMapper
 * @Description
 * @Author Life
 * @Date 2021/7/3 14:47
 * @Version 1.0
 */

@Mapper
public interface AdministratorMapper {
    Administrator selectAdministratorByName(String name);
}
