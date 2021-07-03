package com.example.demo.VO;

import com.example.demo.dao.ClassificatonName;

import java.util.ArrayList;

/**
 * @ClassName MovieClassificationVO
 * @Description
 * @Author Life
 * @Date 2021/6/22 15:10
 * @Version 1.0
 */


public class MovieClassificationVO {
    private int classificationId;
    private String name;
    private String cover;
    private ArrayList<MovieVO> movieList;

    public MovieClassificationVO(ClassificatonName classificatonName, ArrayList<MovieVO> movieList){
        setClassificationId(classificatonName.getClassifid());
        setMovieList(movieList);
        setName(classificatonName.getName());
        setCover(classificatonName.getCover());
    }

    public int getClassificationId() {
        return classificationId;
    }

    public void setClassificationId(int classificationId) {
        this.classificationId = classificationId;
    }

    public ArrayList<MovieVO> getMovieList() {
        return movieList;
    }

    public void setMovieList(ArrayList<MovieVO> movieList) {
        this.movieList = movieList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }
}
