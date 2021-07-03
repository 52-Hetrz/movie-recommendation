package com.example.demo.dao;

/**
 * @ClassName MovieClassification
 * @Description
 * @Author Life
 * @Date 2021/6/25 8:46
 * @Version 1.0
 */


public class MovieClassification {
    private int classifid;
    private int movieid;

    public MovieClassification(Integer classifid, Integer movieid){
        setMovieid(movieid);
        setClassifid(classifid);
    }

    public int getClassifid() {
        return classifid;
    }

    public void setClassifid(int classifid) {
        this.classifid = classifid;
    }

    public int getMovieid() {
        return movieid;
    }

    public void setMovieid(int movieid) {
        this.movieid = movieid;
    }
}
