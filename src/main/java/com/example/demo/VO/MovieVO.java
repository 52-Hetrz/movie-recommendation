package com.example.demo.VO;

import com.example.demo.dao.Movie;

import java.util.ArrayList;

/**
 * @ClassName MovieVO
 * @Description Movie用于前后端通信的类
 * @Author Life
 * @Date 2021/6/22 14:49
 * @Version 1.0
 */


public class MovieVO {
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
    private ArrayList<CommentVO> comments;

    public MovieVO(int id, String name, String area, String introduction,
                   String director, String actor, String publish_year, float score,
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

    public MovieVO(Movie movie, ArrayList<CommentVO> comments){
        setId(movie.getId());
        setName(movie.getName());
        setArea(movie.getArea());
        setIntroduction(movie.getIntroduction());
        setDirector(movie.getDirector());
        setActor(movie.getActor());
        setPublish_year(movie.getPublish_year());
        setScore(movie.getScore());
        setTime(movie.getTime());
        setType(movie.getType());
        setImage(movie.getImage());
        setMv(movie.getMv());
        setComments(comments);
    }

    public MovieVO(Movie movie){
        setId(movie.getId());
        setName(movie.getName());
        setArea(movie.getArea());
        setIntroduction(movie.getIntroduction());
        setDirector(movie.getDirector());
        setActor(movie.getActor());
        setPublish_year(movie.getPublish_year());
        setScore(movie.getScore());
        setTime(movie.getTime());
        setType(movie.getType());
        setImage(movie.getImage());
        setMv(movie.getMv());
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

    public ArrayList<CommentVO> getComments() {
        return comments;
    }

    public void setComments(ArrayList<CommentVO> comments) {
        this.comments = comments;
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
