package com.example.demo.dao;

/**
 * @ClassName Movie
 * @Description Movie的Dao类，用于存储从数据库中读取的Movie的信息
 * @Author Life
 * @Date 2021/6/22 14:37
 * @Version 1.0
 */


public class Movie {
    private int id;
    private String name;
    private String area;
    private String introduction;
    private String director;
    private String actor;
    private String publish_year;
    private float score;
    private String time;
    private String type;
    private String image;
    private String mv;

    public Movie(Integer id, String name, String area, String introduction,
                 String director, String actor, String publish_year, Float score,
                 String time, String type, String image, String mv){
        setId(id);
        setName(name);
        setArea(area);
        setIntroduction(introduction);
        setDirector(director);
        setActor(actor);
        setPublish_year(publish_year);
        setScore(score);
        setTime(time);
        setType(type);
        setImage(image);
        setMv(mv);

    }
    public Movie(String name, String area, String introduction,
                 String director, String actor, String publish_year,
                 String time, String type, String image, String mv){
        setName(name);
        setArea(area);
        setIntroduction(introduction);
        setDirector(director);
        setActor(actor);
        setPublish_year(publish_year);
        setTime(time);
        setType(type);
        setImage(image);
        setMv(mv);

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

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getPublish_year() {
        return publish_year;
    }

    public void setPublish_year(String publish_year) {
        this.publish_year = publish_year;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getMv() {
        return mv;
    }

    public void setMv(String mv) {
        this.mv = mv;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String toString(){
        return getName()+"  "+getPublish_year();
    }
}
