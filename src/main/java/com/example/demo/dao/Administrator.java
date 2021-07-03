package com.example.demo.dao;

/**
 * @ClassName Administrator
 * @Description
 * @Author Life
 * @Date 2021/7/3 14:44
 * @Version 1.0
 */


public class Administrator {
    Integer id;
    String name;
    String password;

    Administrator(Integer id, String name, String password){
        setId(id);
        setName(name);
        setPassword(password);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
