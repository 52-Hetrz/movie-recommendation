package com.example.demo.service;

import com.example.demo.dao.Movie;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RecommendService {
    List<Movie> getRecommendMovieBySlopeOne(int userId, int num);
}
