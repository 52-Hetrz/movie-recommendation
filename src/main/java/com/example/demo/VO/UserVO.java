package com.example.demo.VO;

import com.example.demo.dao.Movie;
import com.example.demo.dao.User;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName UserVO
 * @Description
 * @Author Life
 * @Date 2021/6/22 14:31
 * @Version 1.0
 */


public class UserVO {
    private int id;
    private String name;
    private String mail;
    private String image;
    private ArrayList<MovieVO> collectMovies;
    private ArrayList<CommentVO> comments;

    //update
    private List<Movie> recommendMovies;

    /**
    public UserVO(int id, String name, String mail, String image, ArrayList<MovieVO> collectMovies){
        setId(id);
        setName(name);
        setMail(mail);
        setImage(image);
        setCollectMovies(collectMovies);
    }
     **/

    public UserVO(User user, ArrayList<MovieVO> movies, ArrayList<CommentVO> comments ,List<Movie> recommendMovies){
        setId(user.getId());
        setName(user.getName());
        setMail(user.getMail());
        setImage(user.getImage());
        setCollectMovies(movies);
        setComments(comments);
        setRecommendMovies(recommendMovies);
    }

    //update
    public List<Movie> getRecommendMovies() {
        return recommendMovies;
    }

    public void setRecommendMovies(List<Movie> recommendMovies) {
        this.recommendMovies = recommendMovies;
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

    public ArrayList<MovieVO> getCollectMovies() {
        return collectMovies;
    }

    public void setCollectMovies(ArrayList<MovieVO> collectMovies) {
        this.collectMovies = collectMovies;
    }

    public ArrayList<CommentVO> getComments() {
        return comments;
    }

    public void setComments(ArrayList<CommentVO> comments) {
        this.comments = comments;
    }

    public String toString(){
        return getId()+"  "+getName()+"  "+getCollectMovies().toString();
    }
}
