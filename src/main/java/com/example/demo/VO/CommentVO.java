package com.example.demo.VO;

import com.example.demo.dao.Comment;


/**
 * @ClassName CommentVO
 * @Description comment类和前端通信的类
 * @Author Life
 * @Date 2021/6/22 15:03
 * @Version 1.0
 */


public class CommentVO {
    private int id;
    private String content;
    private String time;
    private int score;
    private int movieId;
    private String movieName;
    private String userName;

    public CommentVO(Comment comment, String userName, String movieName){
        setId(comment.getId());
        setContent(comment.getContent());
        setTime(comment.getTime().toString());
        setScore(comment.getScore());
        setMovieId(comment.getMovieid());
        setMovieName(movieName);
        setUserName(userName);
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
