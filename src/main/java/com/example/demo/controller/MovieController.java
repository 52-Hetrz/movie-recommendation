package com.example.demo.controller;

import com.example.demo.VO.MovieVO;
import com.example.demo.service.impl.MovieServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

/**
 * @ClassName MovieController
 * @Description
 * @Author Life
 * @Date 2021/6/23 15:11
 * @Version 1.0
 */


@RestController
public class MovieController {

    @Autowired
    MovieServiceImpl movieService;

    /**
     * 根据前端传递的电影id，返回电影的数据
     * @param httpServletRequest
     * @return
     */
    @GetMapping("/searchMovieById")
    public MovieVO searchMoveById(HttpServletRequest httpServletRequest){
        String movieId = httpServletRequest.getParameter("id");
        return movieService.selectMovieById(Integer.parseInt(movieId));
    }

    @GetMapping("/fuzzySearchMovieByName")
    public ArrayList<MovieVO> fuzzySearchMovieByName(HttpServletRequest httpServletRequest){
        String name = httpServletRequest.getParameter("name");
        return movieService.fuzzySelectMovieByName(name);
    }

    @GetMapping("/fuzzySearchMovieByType")
    public ArrayList<MovieVO> fuzzySearchMovieByType(HttpServletRequest httpServletRequest){
        String type = httpServletRequest.getParameter("type");
        return movieService.fuzzySelectMovieByType(type);
    }

    @GetMapping("/searchHotMovies")
    public ArrayList<MovieVO> searchHotMovies(){
        return movieService.searchHotMovies();
    }

}
