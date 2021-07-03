package com.example.demo.service;

import com.example.demo.VO.MovieClassificationVO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface MovieClassificationService {
    /**
     * 根据电影分类id选择电影集合
     * @param classifid 电影分类的id
     * @return ArrayList<MovieClassificationVO>：包含分类内的电影
     */
    MovieClassificationVO selectMovieClassification(int classifid);
}
