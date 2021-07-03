package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public interface CollectMovieService {

    /**
     * 插入用户收藏的电影
     * @param userid 用户id
     * @param movieid 电影id
     */
    void insertCollectMovie(int userid, int movieid);

    /**
     * 删除用户收藏电影
     * @param userid 用户id
     * @param movieid 电影id
     */
    void deleteCollectMovie(int userid, int movieid);
}
