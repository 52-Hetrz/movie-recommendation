package com.example.demo.mapper;

import com.example.demo.dao.ClassificatonName;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClassificationNameMapper {

    ClassificatonName selectClassificationName(int classifid);
}
