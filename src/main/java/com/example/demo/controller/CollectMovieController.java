package com.example.demo.controller;

import com.example.demo.service.impl.CollectMovieServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName CollectMovieController
 * @Description
 * @Author Life
 * @Date 2021/6/25 15:34
 * @Version 1.0
 */

@RestController
public class CollectMovieController {

    @Autowired
    CollectMovieServiceImpl collectMovieService;

    @GetMapping("/insertCollectMovie")
    void insertCollectMovie(HttpServletRequest httpServletRequest){
        int userid = Integer.parseInt(httpServletRequest.getParameter("userid"));
        int movieid = Integer.parseInt(httpServletRequest.getParameter("movieid"));
        collectMovieService.insertCollectMovie(userid, movieid);
    }

    @GetMapping("/deleteCollectMovie")
    void deleteCollectMovie(HttpServletRequest httpServletRequest){
        int userid = Integer.parseInt(httpServletRequest.getParameter("userid"));
        int movieid = Integer.parseInt(httpServletRequest.getParameter("movieid"));
        collectMovieService.deleteCollectMovie(userid, movieid);
    }

}
