package com.example.demo.service.impl;

import com.example.demo.dao.CollectMovie;
import com.example.demo.mapper.CollectMovieMapper;
import com.example.demo.service.CollectMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName CollectMovieImpl
 * @Description
 * @Author Life
 * @Date 2021/6/25 15:28
 * @Version 1.0
 */

@Service
public class CollectMovieServiceImpl implements CollectMovieService {

    @Autowired
    CollectMovieMapper collectMovieMapper;

    @Override
    public void insertCollectMovie(int userid, int movieid) {
        CollectMovie collectMovie = new CollectMovie(userid, movieid);
        collectMovieMapper.insertCollectMovie(collectMovie);
    }

    @Override
    public void deleteCollectMovie(int userid, int movieid) {
        CollectMovie collectMovie = new CollectMovie(userid, movieid);
        collectMovieMapper.deleteCollectMovie(collectMovie);
    }
}
