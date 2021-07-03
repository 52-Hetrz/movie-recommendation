package com.example.demo.mapper;

import com.example.demo.dao.CollectMovie;
import org.apache.ibatis.annotations.Mapper;

/**
 * @ClassName CollectMovieMapper
 * @Description
 * @Author Life
 * @Date 2021/6/25 15:18
 * @Version 1.0
 */

@Mapper
public interface CollectMovieMapper {

    void insertCollectMovie(CollectMovie collectMovie);
    void deleteCollectMovie(CollectMovie collectMovie);
}
