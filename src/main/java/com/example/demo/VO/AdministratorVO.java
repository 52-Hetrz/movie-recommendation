package com.example.demo.VO;

/**
 * @ClassName AdministratorVO
 * @Description
 * @Author Life
 * @Date 2021/7/3 15:13
 * @Version 1.0
 */


public class AdministratorVO {
    int id;
    String name;

    public AdministratorVO(Integer id, String name){
        setId(id);
        setName(name);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
