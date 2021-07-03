package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageRedirectController {
	@RequestMapping("/index")
	public String showIndex() {
		return "index";
	}
	
	@RequestMapping("/classify")
	public String showClassify() {
		return "classify";
	}
	
	@RequestMapping("/userPage")
	public String showUserPage() {
		return "userPage";
	}
	
	@RequestMapping("/movielist")
	public String showSongList() {
		return "singleMovieList";
	}
	
	@RequestMapping("/moviepage")
	public String showSongPage() {
		return "singleMovie";
	}

	@RequestMapping("/searchpage")
	public String showSearchPage() {
		return "searchPage";
	}

}
