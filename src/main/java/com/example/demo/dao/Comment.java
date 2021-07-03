package com.example.demo.dao;

import java.sql.Date;

/**
 * @ClassName Comment
 * @Description Comment的Dao类，存储从数据库中读取的Comment数据
 * @Author Life
 * @Date 2021/6/22 14:44
 * @Version 1.0
 */


public class Comment {
    private int id;
    private String content;
    private Date time;
    private int score;
    private int userid;
    private int movieid;

    public Comment(Integer id, String content, Date time, Integer score, Integer userid, Integer movieid){
        setId(id);
        setContent(content);
        setTime(time);
        setScore(score);
        setUserid(userid);
        setMovieid(movieid);
    }

    public Comment(String content, Date time, Integer score, Integer userid, Integer movieid){
        setContent(content);
        setTime(time);
        setScore(score);
        setUserid(userid);
        setMovieid(movieid);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getMovieid() {
        return movieid;
    }

    public void setMovieid(int movieid) {
        this.movieid = movieid;
    }


}
