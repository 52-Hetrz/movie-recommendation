package com.example.demo.dao;

/**
 * @ClassName UserDao
 * @Description 用户Dao类，面向数据库，存储从数据库中读取的数据
 * @Author Life
 * @Date 2021/6/22 14:23
 * @Version 1.0
 */



public class User {
    private Integer id;
    private String name;
    private String password;
    private String mail;
    private String image;

    public User(Integer id, String name, String mail, String password, String image){
        setId(id);
        setName(name);
        setPassword(password);
        setMail(mail);
        setImage(image);
    }

    public User(String name, String password, String mail, String image){
        setName(name);
        setPassword(password);
        setMail(mail);
        setImage(image);
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String toString(){
        return getId()+"   "+getName();
    }

}
