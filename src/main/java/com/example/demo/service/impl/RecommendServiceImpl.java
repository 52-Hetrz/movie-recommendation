package com.example.demo.service.impl;


import com.example.demo.dao.Movie;
import com.example.demo.mapper.MovieMapper;
import com.example.demo.service.RecommendService;
import org.apache.mahout.cf.taste.impl.recommender.CachingRecommender;
import org.apache.mahout.cf.taste.impl.recommender.slopeone.SlopeOneRecommender;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;


import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.springframework.stereotype.Service;

@Service
public class RecommendServiceImpl implements RecommendService {
    @Autowired
    private MovieMapper movieMapper;
    @Autowired
    private DataModel mySQLDataModel;

    @Override
    public List<Movie> getRecommendMovieBySlopeOne(int userId, int num) {
        List<Movie> list=new ArrayList<Movie>();
        try{
            System.out.println("datamodel"+mySQLDataModel);
            Recommender recommender = new CachingRecommender(new SlopeOneRecommender(mySQLDataModel));//构造推荐引擎
            System.out.println(recommender);
            List<RecommendedItem> recommendations = recommender.recommend(userId, num);
            System.out.println(recommendations);
            List<Integer> movieIds=new ArrayList<Integer>();
            for(RecommendedItem recommendedItem:recommendations){
                System.out.println("recommendite!!!!!!!!"+recommendedItem);
                movieIds.add((int) recommendedItem.getItemID());
            }
            System.out.println("movieid!!!!!!!!!!!"+movieIds);

            if(movieIds!=null && movieIds.size()>0){
                for(Integer movieId:movieIds){
                    System.out.println(movieId);
                    System.out.println("mapper"+movieMapper);
                    System.out.println("Movie   "+movieMapper.selectMovieById(movieId));
                    Movie movie= movieMapper.selectMovieById(movieId);
                    System.out.println(movie);
                    list.add(movie);
                }
            }
            else {
                list=new ArrayList<>();
            }
            System.out.println(list.size()+"   ");
        } catch (TasteException e) {
            e.printStackTrace();
        }
        return list;
    }
}
