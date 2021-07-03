package com.example.demo.service;


import com.example.demo.VO.CommentVO;
import com.example.demo.dao.Comment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface CommentService {

    /**
     * 根据用户id查找用户评论的电影
     * @param userId 用户id
     * @return ArrayList<Comment> 存储该用户的所有影评
     */
    ArrayList<CommentVO> searchCommentsByUserId(int userId);

    /**
     * 根据电影id查找对该电影的评论
     * @param movieId 电影id
     * @return ArrayList<Comment> 存储该电影的所有影评
     */
    ArrayList<CommentVO> searchCommentsByMovieId(int movieId);

    /**
     * 根据评论的id查找评论
     * @param id 评论id
     * @return Comment：存有该评论的CommentVO对象
     */
    CommentVO searchCommentById(int id);

    /**
     * 向数据库中插入一条影评
     * @param comment 插入影评的数据
     * @return 是否插入成功
     */
    int insertComment(Comment comment);

    /**
     * 插入评论之后重新计算电影的得分,并更新电影的评分
     * @param movieid 电影的id
     * @return float：重新计算的得分
     */
    void recalculateAndUpdateMovieScore(int movieid);

    /**
     * 删除用户评价
     * @param id 用户id
     */
    void deleteComment(int id);

    /**
     * 查找热门评论
     * @return ArrayList<CommentVO> 包含热门评论的集合
     */
    ArrayList<CommentVO> searchHotComments();
}
