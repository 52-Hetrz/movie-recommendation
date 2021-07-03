package com.example.demo.mapper;


import com.example.demo.dao.MovieClassification;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface MovieClassificationMapper {

    ArrayList<MovieClassification> selectMovieClassification(int classifid);
    void updateMovieClassification();
    void deleteMovieClassification();
}
