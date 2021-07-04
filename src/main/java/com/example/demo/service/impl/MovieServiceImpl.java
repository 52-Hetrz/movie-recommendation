package com.example.demo.service.impl;

import com.example.demo.VO.MovieVO;
import com.example.demo.controller.MovieController;
import com.example.demo.controller.UserController;
import com.example.demo.dao.Movie;
import com.example.demo.mapper.MovieClassificationMapper;
import com.example.demo.mapper.MovieMapper;
import com.example.demo.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @ClassName MovieServiceImpl
 * @Description
 * @Author Life
 * @Date 2021/6/23 10:03
 * @Version 1.0
 */

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    MovieMapper movieMapper;

    @Autowired
    MovieClassificationMapper movieClassificationMapper;

    @Autowired
    CommentServiceImpl commentService;

    @Override
    public ArrayList<MovieVO> searchCollectMoviesByUserId(int userId) {
        ArrayList<Movie> movieArrayList = movieMapper.selectCollectMoviesByUserId(userId);
        ArrayList<MovieVO> movieVOs = new ArrayList<>();
        for(Movie movie : movieArrayList ){
            movieVOs.add(new MovieVO(movie));
        }
        return movieVOs;
    }

    @Override
    public String searchMovieNameById(int id) {
        return movieMapper.selectMovieNameById(id);
    }

    @Override
    public MovieVO selectMovieById(int id) {
        Movie movie = movieMapper.selectMovieById(id);
        return new MovieVO(movie, commentService.searchCommentsByMovieId(id));
    }

    @Override
    public ArrayList<MovieVO> fuzzySelectMovieByName(String name) {
        ArrayList<Movie> movieArrayList = movieMapper.fuzzySelectMovieByName(name);
        ArrayList<MovieVO> movieVOs = new ArrayList<>();
        for(Movie movie : movieArrayList ){
            movieVOs.add(new MovieVO(movie));
        }
        return movieVOs;
    }

    @Override
    public ArrayList<MovieVO> fuzzySelectMovieByType(String type) {
        ArrayList<Movie> movieArrayList = movieMapper.fuzzySelectMovieByType(type);
        ArrayList<MovieVO> movieVOs = new ArrayList<>();
        for(Movie movie : movieArrayList ){
            movieVOs.add(new MovieVO(movie));
        }
        return movieVOs;
    }

    @Override
    public ArrayList<MovieVO> searchHotMovies() {
        ArrayList<Movie> movieArrayList = movieMapper.searchHotMovies();
        ArrayList<MovieVO> movieVOs = new ArrayList<>();
        for(Movie movie : movieArrayList ){
            movieVOs.add(new MovieVO(movie));
        }
        return movieVOs;
    }

    @Override
    public void insertMovie(Movie movie) {
        movieMapper.insertMovie(movie);
        movieClassificationMapper.deleteMovieClassification();
        movieClassificationMapper.updateMovieClassification();
    }

    @Override
    public void deleteMovieById(Integer id) {
        movieMapper.deleteMovieById(id);
    }

    @Override
    public ArrayList<Movie> geyAllMovies() {
        return movieMapper.selectAllMovies();
    }
}
