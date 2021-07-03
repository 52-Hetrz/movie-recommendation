package com.example.demo.controller;

import com.example.demo.VO.MovieClassificationVO;
import com.example.demo.service.MovieClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName MovieClassificationController
 * @Description
 * @Author Life
 * @Date 2021/6/25 12:35
 * @Version 1.0
 */

@RestController
public class MovieClassificationController {
    @Autowired
    MovieClassificationService movieClassificationService;

    @GetMapping("/searchMovieClassification")
    public MovieClassificationVO searchMovieClassification(HttpServletRequest httpServletRequest){
        int classifid = Integer.parseInt(httpServletRequest.getParameter("classifid"));
        return movieClassificationService.selectMovieClassification(classifid);
    }
}
