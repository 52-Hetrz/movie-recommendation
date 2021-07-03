package com.example.demo.controller;

import com.example.demo.VO.CommentVO;
import com.example.demo.dao.Comment;
import com.example.demo.service.impl.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.util.ArrayList;

/**
 * @ClassName CommentController
 * @Description
 * @Author Life
 * @Date 2021/6/23 16:01
 * @Version 1.0
 */
@Controller
@RestController
public class CommentController {

    @Autowired
    CommentServiceImpl commentService;

    @GetMapping("/searchCommentById")
    public CommentVO searchCommentById(HttpServletRequest httpServletRequest){
        String id = httpServletRequest.getParameter("id");
        return commentService.searchCommentById(Integer.parseInt(id));
    }

    @PostMapping("/insertComment")
    @ResponseBody
    public int insertComment(HttpServletRequest httpServletRequest){
        String content = httpServletRequest.getParameter("content");
        Date date = new Date(System.currentTimeMillis());
        int score = Integer.parseInt(httpServletRequest.getParameter("score"));
        int userId = Integer.parseInt(httpServletRequest.getParameter("userId"));
        int movieId = Integer.parseInt(httpServletRequest.getParameter("movieId"));
        Comment comment = new Comment(content, date, score, userId, movieId);
        commentService.insertComment(comment);
        commentService.recalculateAndUpdateMovieScore(movieId);
        return 1;
    }

    @GetMapping("/deleteComment")
    public void deleteComment(HttpServletRequest httpServletRequest){
        int id = Integer.parseInt(httpServletRequest.getParameter("id"));
        commentService.deleteComment(id);
    }

    @GetMapping("/searchHotComments")
    public ArrayList<CommentVO> searchHotComments(){
        return commentService.searchHotComments();
    }
}