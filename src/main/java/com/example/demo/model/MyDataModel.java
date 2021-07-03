package com.example.demo.model;

import com.mysql.cj.jdbc.MysqlDataSource;
//import org.apache.mahout.cf.taste.impl.model.jdbc.ConnectionPoolDataSource;
//import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.model.JDBCDataModel;
import org.apache.mahout.cf.taste.model.DataModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class MyDataModel {
    @Bean
	public  DataModel mySQLDataModel() {
        MysqlDataSource dataSource = new MysqlDataSource();
        JDBCDataModel mySQLDataModel = null;
        try {
            dataSource.setServerName("localhost");
            dataSource.setUser("root");
            dataSource.setPassword("121982");
            dataSource.setDatabaseName("movie");
            dataSource.setServerTimezone("UTC");


            //ConnectionPoolDataSource connectionPool=new ConnectionPoolDataSource(dataSource);
            // use JNDI
            //dataModel = new MySQLJDBCDataModel(connectionPool,"movie_preferences", "userID", "movieID","preference");
            mySQLDataModel = new MySQLJDBCDataModel(dataSource,"comment", "userid", "movieid","score",null);
            System.out.println("model!!!!!!!!"+mySQLDataModel);

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return mySQLDataModel;
    } 

}
