package com.example.demo.service.impl;

import com.example.demo.VO.MovieClassificationVO;
import com.example.demo.VO.MovieVO;
import com.example.demo.dao.ClassificatonName;
import com.example.demo.dao.MovieClassification;
import com.example.demo.mapper.ClassificationNameMapper;
import com.example.demo.mapper.MovieClassificationMapper;
import com.example.demo.mapper.MovieMapper;
import com.example.demo.service.MovieClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @ClassName MovieClassificationImpl
 * @Description
 * @Author Life
 * @Date 2021/6/25 12:21
 * @Version 1.0
 */

@Service
public class MovieClassificationServiceImpl implements MovieClassificationService {

    @Autowired
    MovieClassificationMapper movieClassificationMapper;

    @Autowired
    ClassificationNameMapper classificationNameMapper;

    @Autowired
    MovieMapper movieMapper;

    @Override
    public MovieClassificationVO selectMovieClassification(int classifid) {
        ArrayList<MovieClassification> movieClassifications =
                movieClassificationMapper.selectMovieClassification(classifid);
        ClassificatonName classificatonName = classificationNameMapper.selectClassificationName(classifid);
        ArrayList<MovieVO> movieVOS = new ArrayList<>();
        for(MovieClassification movieClassification: movieClassifications){
            movieVOS.add(new MovieVO(
                    movieMapper.selectMovieById(movieClassification.getMovieid())));
        }
        return new MovieClassificationVO(classificatonName, movieVOS);
    }
}
