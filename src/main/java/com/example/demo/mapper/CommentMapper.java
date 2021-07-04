package com.example.demo.mapper;

import com.example.demo.dao.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

@Mapper
@ResponseBody
public interface CommentMapper {

    ArrayList<Comment> selectCommentsByUserId(int userId);
    ArrayList<Comment> selectCommentsByMovieId(int movieId);
    Comment selectCommentById(int id);
    int insertComment(Comment comment);
    void recalculateAndUpdateMovieScore(int movieid);
    void deleteComment(int id);
    ArrayList<Comment> searchHotComments();
    ArrayList<Comment> selectAllComments();
}
