package com.example.demo.dao;

/**
 * @ClassName CollectMovie
 * @Description
 * @Author Life
 * @Date 2021/6/25 15:18
 * @Version 1.0
 */


public class CollectMovie {
    int userid;
    int movieid;

    public CollectMovie(Integer userid, Integer movieid){
        setMovieid(movieid);
        setUserid(userid);
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
