package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * @author life
 *
 */
@RestController
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class EchoBuzzingApplication {

	public static void main(String[] args) {
		SpringApplication.run(EchoBuzzingApplication.class, args);
	}
}
