package com.example.demo.service.impl;

import com.example.demo.VO.CommentVO;
import com.example.demo.controller.CommentController;
import com.example.demo.controller.UserController;
import com.example.demo.dao.Comment;
import com.example.demo.mapper.CommentMapper;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @ClassName CommentServiceImpl
 * @Description
 * @Author Life
 * @Date 2021/6/23 10:14
 * @Version 1.0
 */


@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentMapper commentMapper;
    @Autowired
    UserServiceImpl userService;
    @Autowired
    MovieServiceImpl movieService;

    @Override
    public ArrayList<CommentVO> searchCommentsByUserId(int userId) {
        ArrayList<Comment> comments = commentMapper.selectCommentsByUserId(userId);
        ArrayList<CommentVO> commentVOS = new ArrayList<>();
        for(Comment comment:comments){
            commentVOS.add(new CommentVO(comment,
                    userService.searchUserNameById(comment.getUserid()),
                    movieService.searchMovieNameById(comment.getMovieid())));
        }
        return commentVOS;
    }

    @Override
    public ArrayList<CommentVO> searchCommentsByMovieId(int movieId) {
        ArrayList<Comment> comments = commentMapper.selectCommentsByMovieId(movieId);
        ArrayList<CommentVO> commentVOS = new ArrayList<>();
        for(Comment comment: comments){
            commentVOS.add(makeCommentVO(comment));
        }
        return commentVOS;
    }

    @Override
    public CommentVO searchCommentById(int id) {
        Comment comment = commentMapper.selectCommentById(id);
        return makeCommentVO(comment);
    }

    @Override
    public int insertComment(Comment comment) {
        return commentMapper.insertComment(comment);
    }

    @Override
    public void recalculateAndUpdateMovieScore(int movieid) {
        commentMapper.recalculateAndUpdateMovieScore(movieid);
    }

    @Override
    public void deleteComment(int id) {
        commentMapper.deleteComment(id);
    }

    @Override
    public ArrayList<CommentVO> searchHotComments() {
        ArrayList<Comment> comments = commentMapper.searchHotComments();
        ArrayList<CommentVO> commentVOS = new ArrayList<>();
        for(Comment comment:comments)
            commentVOS.add(makeCommentVO(comment));
        return commentVOS;
    }

    @Override
    public ArrayList<Comment> getAllComments() {
        return commentMapper.selectAllComments();
    }

    CommentVO makeCommentVO(Comment comment){
        return new CommentVO(comment,
                userService.searchUserNameById(comment.getUserid()),
                movieService.searchMovieNameById(comment.getMovieid()));
    }
}
