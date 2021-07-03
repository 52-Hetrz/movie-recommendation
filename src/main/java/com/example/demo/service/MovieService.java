package com.example.demo.service;


import com.example.demo.VO.MovieVO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface MovieService {
    /**
     * 根据用户id选取用户收藏的电影
     * @param userId 用户id
     * @return ArrayList<MovieVO>:存储着该用户收藏的电影
     */
    ArrayList<MovieVO> searchCollectMoviesByUserId(int userId);

    /**
     * 根据电影id查找电影名称
     * @param id 电影id
     * @return String：电影名
     */
    String searchMovieNameById(int id);

    /**
     * 根据电影id查找电影
     * @param id 电影id
     * @return MovieVO：存储该电影信息的MovieVO对象
     */
    MovieVO selectMovieById(int id);

    /**
     * 根据用户输入检索电影名匹配的电影
     * @param name 用户输入内容
     * @return ArrayList<MovieVO>: 符合要求的电影VO集合
     */
    ArrayList<MovieVO> fuzzySelectMovieByName(String name);

    /**
     * 根据类型对电影类型进行模糊查找
     * @param type 要查找的电影类型
     * @return ArrayList<MovieVO>: 符合要求的电影VO集合
     */
    ArrayList<MovieVO> fuzzySelectMovieByType(String type);

    /**
     * 查找热门电影
     * @return ArrayList<MovieVO>: 符合要求的电影VO集合
     */
    ArrayList<MovieVO> searchHotMovies();

}
