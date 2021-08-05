
/************** classify****************/
function showClassifyList(listid){
    $.ajax({
        type:"get",
        url:"/user/songListPage",
        data:{songListId:listid},
        dataType:'json',
        success:function(songListPageVO){
            console.log("打开歌单："+songListPageVO.songListName)
			var str=JSON.stringify(songListPageVO)
			sessionStorage.obj=str
			window.location.href="songlist"
		},
		error:function(data){
			console.log("打开歌单失败")
			//console.log(data["songListId")
		}
	})
}

/************** index****************/
function logout(){
	if(sessionStorage.loginStatus==undefined){
		sessionStorage.loginStatus=0
	}
}
function alogout(){
	if(sessionStorage.aloginStatus==undefined){
		sessionStorage.aloginStatus=0
	}
}
function usrlogout(){
	if(sessionStorage.loginStatus==1 || sessionStorage.loginStatus==undefined){
		sessionStorage.loginStatus=0
		window.location.href="userPage"
	}
		
}
function Administratorlogout(){
	if(sessionStorage.aloginStatus==1){
		sessionStorage.aloginStatus=0
		window.location.href="administratorLoginPage"
	}

}

function addIndexComment(){
	$.ajax({
		type:"get",
		url:"/searchHotComments",
		//data:{songName:searchtext},
		//dataType:'json',
		success:function(commentlist){
			console.log("获得热评成功")
			var myCommentList=document.getElementById("user_collectsongList_ul")
			for(let i in commentlist){
				let add=document.createElement("div")
				add.className="single-usr-comment"
				add.innerHTML="<hr><span><a onclick='showSongPage("+commentlist[i].movieId+")'>"+commentlist[i].movieName+"</a></span><br><br><span>"+commentlist[i].score+" 分</span><br></span><span>"+commentlist[i].content+"</span><br><br><span style='font-size: small;'>"+commentlist[i].time+"</span><br><span style='font-size: small;'>"+commentlist[i].userName+"</span>"
				myCommentList.appendChild(add)
			}
		},
		error:function(commentlist){
			console.log("获得热评失败")
		}
	})
}


function addHotMovie(){
	$.ajax({
		type:"get",
		url:"/searchHotMovies",
		//data:{songName:searchtext},
		//dataType:'json',
		success:function(movielist){
			console.log("获得热门电影成功")
			var myMovieList=document.getElementById("flexiselDemo1")
			for(let i in movielist){
				let add=document.createElement("li")
				add.className="nbs-flexisel-item"
				add.innerHTML='<img src="'+movielist[i].image+'" alt="" id="song-list-'+movielist[i].id+'" onclick="showSongPage('+movielist[i].id+')"/> <div class="slide-title" ><h4>《'+movielist[i].name+'》</h4></div><div class="date-city"><div class="buy-tickets"></div></div>'
				myMovieList.appendChild(add)
			}
		},
		error:function(movielist){
			console.log("获得热门电影失败")
		}
	})
}

function searchFilm(){
	var searchtext
	$("#search-form").on("submit",function(event){
		event.preventDefault()
		searchtext=$("#search-input").val()
		//alert(searchtext)
		$.ajax({
			type:"get",
			url:"/getSongBySongName",
			data:{songName:searchtext},
			dataType:'json',
			success:function(songMessageVO){
				console.log("打开歌曲："+songMessageVO.song.songName)
				if(songMessageVO.song.songName=="找不到该歌曲"){
					alert("找不到该歌曲")
				}else{
					var songstr=JSON.stringify(songMessageVO)
					sessionStorage.songobj=songstr
					window.location.href="songpage"
				}

			},
			error:function(songMessageVO){
				console.log("打开歌曲失败")
			}
		})
	})
}

function searchFilmByName(){
	var searchtext
		searchtext=$("#search-input").val()
		//alert(searchtext)
		$.ajax({
			type:"get",
			url:"/fuzzySearchMovieByName",
			data:{name:searchtext},
			dataType:'json',
			success:function(movielist){
				if(movielist.length<1){
					console.log("未搜索到内容")
					alert("无相关搜索内容")
				}else{
					sessionStorage.searchResult=JSON.stringify(movielist)
					console.log("搜索到信息")
					window.location.href="searchpage"
				}

			},
			error:function(songlist){
				console.log("搜索失败")
			}
		})
}

function searchFilmByType(){
	var searchtext
	searchtext=$("#search-input").val()
	//alert(searchtext)
	$.ajax({
		type:"get",
		url:"/fuzzySearchMovieByType",
		data:{type:searchtext},
		dataType:'json',
		success:function(movielist){
			if(movielist.length<1){
				console.log("未搜索到内容")
				alert("无相关搜索内容")
			}else{
				sessionStorage.searchResult=JSON.stringify(movielist)
				console.log("搜索到信息")
				window.location.href="searchpage"
			}

		},
		error:function(songlist){
			console.log("搜索失败")
		}
	})
}

function toSongPage(){
	showSongPage(sessionStorage.songId)
}

function showSongPage(songid){
	sessionStorage.songId=songid
	$.ajax({
		type:"get",
		url:"/searchMovieById",
		data:{id:songid},
		dataType:'json',
		success:function(MovieVO){
			console.log("打开电影："+MovieVO.name)
			var moviestr=JSON.stringify(MovieVO)
			sessionStorage.movieobj=moviestr
			//updateUsr()
			window.location.href="moviepage"
		},
		error:function(MovieVO){
			console.log("打开电影失败")
		}
	})
}

function showList(listid){
	sessionStorage.listId=listid
	$.ajax({
		type:"get",
		url:"/searchMovieClassification",
		data:{classifid:listid},
		dataType:'json',
		success:function(MovieClassificationVO){
			console.log("打开电影分类："+MovieClassificationVO.name)
			var str=JSON.stringify(MovieClassificationVO)
			sessionStorage.movieclassification=str
			window.location.href="movielist"
		},
		error:function(MovieClassificationVO){
			console.log("打开电影分类失败")
			//console.log(data["songListId")
		}
	})
}

function userRegister(){
	var usrname=document.getElementById('usr-name').value
	var usremail=document.getElementById('usr-email').value
	var usrpwd1=document.getElementById('usr-password1').value
	var usrpwd2=document.getElementById('usr-password2').value
	
	$.ajax({
		type:"get",
		url:"/register",
		data:{name:usrname,mail:usremail,firstPassword:usrpwd1,secondPassword:usrpwd2},
		dataType:'json',
		success:function(RegisterAndLoginReturn){
			console.log("用户注册信息交互成功")
			if(RegisterAndLoginReturn.isSuccessful===true){
				document.getElementById('register-warning').innerHTML="注册成功"
			}else{
				document.getElementById('register-warning').innerHTML=RegisterAndLoginReturn.warning
			}

		},
		error:function(RegisterAndLoginReturn){
			console.log("用户注册信息交互失败")
		}
	})
	
}

function userlogin(){
	var usrname=document.getElementById('name').value
	//console.log(usrname)
	var usrpwd=document.getElementById('password').value
	sessionStorage.pwd=usrpwd
	$.ajax({
		type:"get",
		url:"/login",
		data:{name:usrname,password:usrpwd},
		dataType:'json',
		success:function(RegisterAndLoginReturn){
			console.log("用户登录信息交互成功")
			document.getElementById('login-warning').innerHTML=RegisterAndLoginReturn.warning
			if(RegisterAndLoginReturn.isSuccessful===true){
				sessionStorage.loginStatus=1
				sessionStorage.onlineUsrName=RegisterAndLoginReturn.userVO.name
				sessionStorage.onlineUsrId=RegisterAndLoginReturn.userVO.id
				sessionStorage.onlineUsr=JSON.stringify(RegisterAndLoginReturn)
				window.location.href="index"
			}
			//console.log(sessionStorage.loginStatus+","+sessionStorage.onlineUsrName+","+sessionStorage.onlineUsrId)
		},
		error:function(RegisterAndLoginReturn){
			console.log("用户登录信息交互失败")
		}
	})
	
}
/************** singer****************/
function showSingerPage(singerid){
	//alert(singerid)
	$.ajax({
		type:"get",
		url:"/searchSinger1",
		data:{id:singerid},
		dataType:'json',
		success:function(SingerVO){
			console.log("打开歌手："+SingerVO.name)
			var singerstr=JSON.stringify(SingerVO)
			sessionStorage.singerobj=singerstr
			window.location.href="singerpage"
		},
		error:function(){
			console.log("打开歌手失败")
		}
	})
}

/************** singleSong****************/
function playSingleSong(){
	var song=JSON.parse(sessionStorage.songobj)
	var songpath=song.song.songAddress
	var songimg=song.song.pictureAddress
	
	document.getElementById("audio-player").src=songpath
	document.getElementById('audio-player').play()
	document.getElementById('cover-img').src=songimg
}

function collectSong(listid){
	if(sessionStorage.loginStatus==1){
		var usrid=sessionStorage.onlineUsrId
		var songid=sessionStorage.songId
		//console.log(listid)
		$.ajax({
		type:"get",
		url:"/user/collectSong",
		data:{songListId:listid,songId:songid,userId:usrid},
		dataType:'text',
		success:function(data){
			console.log("收藏歌曲成功")
			updateUsr()
		},
		error:function(data){
			console.log("收藏歌曲失败")
		}
		})
	}else{
		alert("账号未登录！")
	}

}

$(function(){
	$("#song-comment-submit").click(function(){
		if(sessionStorage.loginStatus==1){
			var commentText=$("#song-comment-text").val()
			document.getElementById("song-comment-text").value='评论'
			var movie=JSON.parse(sessionStorage.movieobj)
			var userid=sessionStorage.onlineUsrId
			var movieid=movie.id
			var username=sessionStorage.onlineUsrName
			var rankScore=$("#film-score option:selected").val()
			//alert(rankScore)
			var date = new Date();
			var commentdata={
				    "userId":userid,
					"content":commentText,
					"movieId":movieid,
					"score":rankScore,
				    "time":date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
				    "usrname":username,
			}
			sessionStorage.commentdata=JSON.stringify(commentdata)
			$.ajax({
				type:"post",
				url:"/insertComment",
				data:{userId:userid,content:commentText,movieId: movieid,score:rankScore},
				dataType:'json',
				success:function(re){
					console.log("歌曲评论成功")
					var songcommentlist=document.getElementById("song-comments-list")
					let add=document.createElement("div")
					add.className="single-usr"
					var newcomment=JSON.parse(sessionStorage.commentdata)
					add.innerHTML="<hr></span><span>评分："+newcomment.score+" 分</span><br></span><span>"+newcomment.content+"</span><br><br><span style='font-size: small;'>"+newcomment.time+"</span><br><span style='font-size: small;'>"+newcomment.usrname+"</span>"
					songcommentlist.appendChild(add)
					updateUsr()
				},
				error:function(re){
					console.log("评论歌曲失败")
				}
			})
		}else{
			alert("账号未登录！")
		}

	})
})
/************** singleSongList****************/
function playlistSong(songid){
	var songlist=JSON.parse(sessionStorage.obj)
	for(let i in songlist.songs){
		if(songlist.songs[i].id==songid){
			var songpath=songlist.songs[i].songAddress
			var songimg=songlist.songs[i].pictureAddress
		}
	}
	
	document.getElementById("audio-player").src=songpath
	document.getElementById('audio-player').play()
	document.getElementById('cover-img').src=songimg
}

function collectfilm(){
	var movieid=sessionStorage.songId
	if(sessionStorage.loginStatus==1){
		//var listid=sessionStorage.listId
		var usrid=sessionStorage.onlineUsrId
		//console.log(listid)
		$.ajax({
		type:"get",
		url:"/insertCollectMovie",
		data:{movieid:movieid,userid:usrid},
		dataType:'text',
		success:function(data){
			console.log("收藏电影成功")
			updateUsr()
		},
		error:function(data){
			console.log("收藏电影失败")
			updateUsr()
		}
		})
	}else{
		alert("账号未登录！")
	}

}

$(function(){
	$("#comment-submit").click(function(){
		if(sessionStorage.loginStatus==1){
			var commentText=$("#comment-text").val()
			document.getElementById("comment-text").value='评论'
			var year=new Date().getFullYear()
			var month=new Date().getMonth()+1
			var day=new Date().getDate()
			var date=year+'-'+month+'-'+day
			var username=sessionStorage.onlineUsrName
			var listid=sessionStorage.listId
			$.ajax({
				type:"get",
				url:"/user/submitComment",
				data:{songListId:listid,userName:username,comment:commentText,createTime:date},
				dataType:'json',
				success:function(comments){
					console.log(comments)
					var comment=document.getElementById("comments-list")
	                comment.innerHTML=''
					for(let i in comments){
						let add=document.createElement("div")
						add.className="single-usr"
						add.innerHTML='<hr><a href="#">'+comments[i].userName+'</a>:<br>'+comments[i].comment
						comment.appendChild(add)
					}
					var newcomment={userName:comments[comments.length-1].userName,comment:comments[comments.length-1].comment}
					var listinf=sessionStorage.obj
	                var listingobj=JSON.parse(listinf)
	                listingobj.songListComments.push(newcomment)
	                sessionStorage.obj=JSON.stringify(listingobj)
				},
				error:function(comments){
					console.log("error")
				}
			})
		}else{
			alert("账号未登录！")
		}

	})
})

function deleteCollectSong(songid){
	sessionStorage.deletesongid=songid
	var listid=sessionStorage.listId
	var usrid=sessionStorage.onlineUsrId
	var songid=sessionStorage.songId
	$.ajax({
		type:"get",
		url:"/deleteCollectMovie",
		data:{userid:usrid,movieid:songid},
		dataType:'text',
		success:function(data){
			console.log("删除收藏电影成功")
			
			document.getElementById("list-item"+sessionStorage.deletesongid).innerHTML=''
			var songlist=JSON.parse(sessionStorage.obj)
			for(let i in songlist.songs){
				if(songlist.songs[i].id==sessionStorage.deletesongid){
					songlist.songs.splice(i,1)
				}
			}
			sessionStorage.obj=JSON.stringify(songlist)
			//updateUsr()
			/*
			var usr=JSON.parse(sessionStorage.onlineUsr)
		    for(let i in usr.userVO.songLists){
		    	if(usr.userVO.songLists[i].songListId==listid){
		    		usr.userVO.songLists.splice(i,1)
		    	}
		    }
			sessionStorage.onlineUsr=JSON.stringify(usr)
			*/
			
		},
		error:function(data){
			console.log("删除收藏电影失败")
			//console.log(data["songListId")
		}
    })
    
}



/************** userPage****************/
function emptyUserPage(){
	logout()
	if(sessionStorage.loginStatus==0 || sessionStorage.loginStatus==undefined){
		document.getElementById('page-wrapper').innerHTML='<form action="login" method="post" id="loginForm" style="position:absolute;left:40%;"><fieldset id="body"><fieldset><label for="name">用户名</label><input type="text" name="name" id="usr-page-name"></fieldset><fieldset><label for="password">密码</label><input type="password" name="password" id="usr-page-password"></fieldset><p class="warning" id="usr-page-login-warning"></p><input type="button" id="login" value="Login" onclick="userPageLogin()"><label for="checkbox"></label></fieldset><span></span></form>'
	}
}

function emptyAdministratorPage(){
	alogout()
	if(sessionStorage.aloginStatus==0 || sessionStorage.aloginStatus==1){
		document.getElementById('page-wrapper').innerHTML='<form action="login" method="post" id="loginForm" style="position:absolute;left:40%;"><fieldset id="body"><fieldset><label for="name">管理员用户名</label><input type="text" name="name" id="usr-page-name"></fieldset><fieldset><label for="password">密码</label><input type="password" name="password" id="usr-page-password"></fieldset><p class="warning" id="usr-page-login-warning"></p><input type="button" id="login" value="Login" onclick="adminiPageLogin()"><label for="checkbox"></label></fieldset><span></span></form>'
	}
}

function userPageLogin(){
	var usrname=document.getElementById('usr-page-name').value
	//console.log(usrname)
	var usrpwd=document.getElementById('usr-page-password').value
	sessionStorage.pwd=usrpwd
	$.ajax({
		type:"get",
		url:"/login",
		data:{name:usrname,password:usrpwd},
		dataType:'json',
		success:function(RegisterAndLoginReturn){
			console.log("用户登录信息交互成功")
			document.getElementById('usr-page-login-warning').innerHTML=RegisterAndLoginReturn.warning
			sessionStorage.loginStatus=1
			sessionStorage.onlineUsrName=RegisterAndLoginReturn.userVO.name
			sessionStorage.onlineUsrId=RegisterAndLoginReturn.userVO.id
			sessionStorage.onlineUsr=JSON.stringify(RegisterAndLoginReturn)
			window.location.href="userPage"
			//console.log(sessionStorage.loginStatus+","+sessionStorage.onlineUsrName+","+sessionStorage.onlineUsrId)
		},
		error:function(RegisterAndLoginReturn){
			console.log("用户登录信息交互失败")
		}
	})
	
}

function adminiPageLogin(){
	var usrname=document.getElementById('usr-page-name').value
	//console.log(usrname)
	var usrpwd=document.getElementById('usr-page-password').value
	sessionStorage.adminpwd=usrpwd
	$.ajax({
		type:"get",
		url:"/administrator/login",
		data:{name:usrname,password:usrpwd},
		dataType:'json',
		success:function(RegisterAndLoginReturn){
			console.log("管理员登录信息交互成功")
			document.getElementById('usr-page-login-warning').innerHTML=RegisterAndLoginReturn.warning
			sessionStorage.aloginStatus=1
			sessionStorage.onlineadminName=RegisterAndLoginReturn.administratorVO.name
			sessionStorage.onlineadminId=RegisterAndLoginReturn.administratorVO.id
			sessionStorage.onlineAdmin=JSON.stringify(RegisterAndLoginReturn)
			window.location.href="adminindex"
			//console.log(sessionStorage.loginStatus+","+sessionStorage.onlineUsrName+","+sessionStorage.onlineUsrId)
		},
		error:function(RegisterAndLoginReturn){
			console.log("管理员登录信息交互失败")
		}
	})

}

function updateUsr(){
	var usrname=sessionStorage.onlineUsrName
	var usr=JSON.parse(sessionStorage.onlineUsr)
	var usrpwd=sessionStorage.pwd
	$.ajax({
		type:"get",
		url:"/login",
		data:{name:usrname,password:usrpwd},
		dataType:'json',
		success:function(RegisterAndLoginReturn){
			console.log("用户更新信息交互成功")
			if(RegisterAndLoginReturn.isSuccessful===true){
				sessionStorage.loginStatus=1
				sessionStorage.onlineUsrName=RegisterAndLoginReturn.userVO.name
				sessionStorage.onlineUsrId=RegisterAndLoginReturn.userVO.id
				sessionStorage.onlineUsr=JSON.stringify(RegisterAndLoginReturn)
			}
		},
		error:function(RegisterAndLoginReturn){
			console.log("用户更新信息交互失败")
		}
	})
}
//删除用户创建的歌单
//listid指歌单编号
function deleteCollectMovie(listid){
	var usrid=sessionStorage.onlineUsrId
	//var songid=sessionStorage.songId
	sessionStorage.deleteCollectMovieId=listid
	$.ajax({
		type:"get",
		url:"/deleteCollectMovie",
		data:{userid:usrid,movieid:listid},
		dataType:'text',
		success:function(data){
			console.log("删除收藏电影成功")
			document.getElementById("usr-song-list"+sessionStorage.deleteCollectMovieId).innerHTML=''
			var usr=JSON.parse(sessionStorage.onlineUsr)
		    for(let i in usr.userVO.collectMovies){
		    	if(usr.userVO.collectMovies[i].id==sessionStorage.deleteCollectMovieId){
		    		usr.userVO.collectMovies.splice(i,1)
		    	}
		    }
		    //console.log(usr)
			sessionStorage.onlineUsr=JSON.stringify(usr)
			
		},
		error:function(data){
			console.log("删除收藏电影失败")
			//console.log(data["songListId")
		}
    })
}

function deleteMyComment(listid){
	var usrid=sessionStorage.onlineUsrId
	//var songid=sessionStorage.songId
	sessionStorage.deletemoviecommentid=listid
	$.ajax({
		type:"get",
		url:"/deleteComment",
		data:{id:listid},
		dataType:'text',
		success:function(data){
			console.log("删除评论成功")
			document.getElementById("single-usr-film-comment"+sessionStorage.deletemoviecommentid).innerHTML=''
			var usr=JSON.parse(sessionStorage.onlineUsr)
			for(let i in usr.userVO.comments){
				if(usr.userVO.comments[i].id==sessionStorage.deletemoviecommentid){
					usr.userVO.comments.splice(i,1)
				}
			}
			//console.log(usr)
			sessionStorage.onlineUsr=JSON.stringify(usr)

		},
		error:function(data){
			console.log("删除评论失败")
			//console.log(data["songListId")
		}
	})
}

//删除用户收藏的歌单
//listid指歌单收藏号
function deleteMyCollectList(listid){
	var userid=sessionStorage.onlineUsrId
	$.ajax({
		type:"get",
		url:"/user/deleteCollectSongList",
		data:{collectSongListId:listid,userId:userid},
		dataType:'json',
		success:function(songLists){
			console.log("删除收藏歌单成功")
			var collectlist=document.getElementById("user_collectsongList_ul")
			collectlist.innerHTML=''
			for(let i in songLists){
		    	let add=document.createElement("li")
		    	//add.id="usr-collectsong-list"+usr.userVO.songLists[i].songListId
		    	add.innerHTML='<div class="jp-playlist-item-div SingleSong"><a href="javascript:;" class="jp-playlist-item" tabindex="0">'+songLists[i].songListName+'</a><img src="../static/images/delete.png"class="song-btn" onclick="deleteMyCollectList('+songLists[i].collectSongListId+')"></div>'
		    	collectlist.appendChild(add)
			}
			updateUsr()
			/*
			var usr=JSON.parse(sessionStorage.onlineUsr)
		    for(let i in usr.userVO.collectSongLists){
		    	if(usr.userVO.collectSongLists[i].songListId==songLists[i].songListId){
		    		usr.userVO.collectSongLists.splice(i,1)
		    	}
		    }
			sessionStorage.onlineUsr=JSON.stringify(usr)
			*/
		},
		error:function(data){
			console.log("删除收藏歌单失败")
			//console.log(data["songListId")
		}
	})
}

function userChangePwd(){
	var usrname=document.getElementById('user-name').value
	var oldpwd=document.getElementById('old-pwd').value
	var usrpwd1=document.getElementById('new-pwd1').value
	var usrpwd2=document.getElementById('new-pwd2').value
	
	$.ajax({
		type:"get",
		url:"/changePassword",
		data:{name:usrname,oldPassword:oldpwd,firstPassword:usrpwd1,secondPassword:usrpwd2},
		dataType:'json',
		success:function(registerAndLoginReturn){
			console.log("用户更改密码信息交互成功")
			document.getElementById('change-pwd-warning').innerHTML=registerAndLoginReturn.warning
		},
		error:function(registerAndLoginReturn){
			console.log("用户更改密码信息交互失败")
		}
	})
	
}
/********创建歌单start*********/
function showImg(input) {
	var file = input.files[0];
	var reader = new FileReader()
	// 图片读取成功回调函数
	reader.onload = function(e) {
		dealImage(e.target.result, 500, useImg);
		function useImg(base64) {
		       str= base64;
		       sessionStorage.imginf=str
		}
    	document.getElementById('upload').src=e.target.result
	}
	reader.readAsDataURL(file)
}
function showImg2(input) {
	var file = input.files[0];
	var reader = new FileReader()
	// 图片读取成功回调函数
	reader.onload = function(e) {
		dealImage(e.target.result, 500, useImg);
		function useImg(base64) {
			str= base64;
			sessionStorage.imginf2=str
		}
		document.getElementById('upload2').src=e.target.result
	}
	reader.readAsDataURL(file)
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

function createList(){
	//alert("111")
	var listimg=''
	var listname=$("#list-item-name").val()
	var listtype=$("#list-type-name").val()
	if(sessionStorage.imginf){
		listimg=sessionStorage.imginf
	}else{
		var image=new Image()
		image.crossOrigin=''
		image.src='../static/images/songlist/cover.png'
		image.onload=function(){
    		dealImage(getBase64Image(image), 500, useImg);
    		function useImg(base64) {
    		       str= base64;
    		       listimg=str
    		}
		}
	}
	
	var year=new Date().getFullYear()
	var month=new Date().getMonth()+1
	var day=new Date().getDate()
	var date=year+'-'+month+'-'+day
	var userid=sessionStorage.onlineUsrId
	$.ajax({
		type:"post",
		url:"/user/createSongList",
		data:{songListName:listname,userId:userid,createTime:date,label:listtype,songListImg:listimg},
		dataType:'text',
		success:function(data){
			console.log("创建歌单成功")
			updateUsr()
			
		},
		error:function(data){
			console.log("创建歌单失败")
		}
	})
	
}
//压缩方法
function dealImage(base64, w, callback) {
    var newImage = new Image();
    var quality = 0.6;    //压缩系数0-1之间
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
    var imgWidth, imgHeight;
    newImage.onload = function () {
        imgWidth = this.width;
        imgHeight = this.height;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
            if (imgWidth > imgHeight) {
                canvas.width = w;
                canvas.height = w * imgHeight / imgWidth;
            } else {
                canvas.height = w;
                canvas.width = w * imgWidth / imgHeight;
            }
        } else {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            quality = 0.6;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
        callback(base64);
    }
}
/********创建歌单end*********/

/********后台管理start*********/
/********电影管理start*********/
function getAllMovies(){
	deleteAddMovie()
	reviseMovie()
	$.ajax({
		type:"get",
		url:"/administrator/getAllMovies",
		//data:{name:usrname,oldPassword:oldpwd,firstPassword:usrpwd1,secondPassword:usrpwd2},
		dataType:'json',
		success:function(movielist){
			console.log("获得全部电影列表成功")
			//解析全部列表
			build_movies_table(movielist)
			//解析分页信息
			//build_movies_trip_page_info(movielist)
			//解析分页条数据
			//build_movies_page_nav(movielist)
		},
		error:function(movielist){
			console.log("获得全部电影列表失败")
		}
	})
}

function build_movies_table(movielist){
	$("#trips_table tbody").empty();
	$.each(movielist,function(index,item){
		var checkBox=$("<td><input type='checkbox' class='check_item'/></td>");
		var id = $("<td></td>").append(item.id);
		var moviename = $("<td></td>").append(item.name);
		var moviearea = $("<td></td>").append(item.area);
		//var startTimeText = item.startTime;
		//去除时间后面的.0
		//startTimeText = startTimeText.substring(0, startTimeText.lastIndexOf(':'));
		var movieintroduction = $("<td></td>").append(item.introduction);
		//var reachTimeText = item.reachTime;
		//去除时间后面的.0
		//reachTimeText = reachTimeText.substring(0, reachTimeText.lastIndexOf(':'));
		var moviedirector = $("<td></td>").append(item.director);
		var movieactor = $("<td></td>").append(item.actor);
		var movieyear = $("<td></td>").append(item.publish_year);
		var moviescore = $("<td></td>").append(item.score);
		var movietime = $("<td></td>").append(item.time);
		var movietype = $("<td></td>").append(item.type);
		var movieimg = $("<td></td>").append("<img src='"+item.image+"' style='height:100px;'>")
		//查看途经站信息
		/*
		var button0 = $("<td></td>").append($("<button></button>").addClass("btn btn-default btn-sm look_btn").append($("<span></span>").attr("aria-hidden", true)).append("查看"));
		var button1 = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("编辑");
		var button2 = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden", true)).append("删除");
		var td_btn = $("<td></td>").append(button1).append(" ").append(button2);
		*/
		var button1 = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("修改");
		var button2 = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden", true)).append("删除");
		var td_btn = $("<td></td>").append(button1).append(button2);
		$("<tr></tr>").append(checkBox).append(id).append(moviename).append(moviearea).append(movieintroduction).append(moviedirector).append(movieactor).append(movieyear).append(moviescore).append(movietime)
			.append(movietype).append(movieimg).append(td_btn ).appendTo("#trips_table tbody");
	})

}

//解析分页信息
function build_movies_trip_page_info(result) {
	$("#page_info_area").empty();
	$("#page_info_area").append("当前" + result.data.pageNum + "页,总共" + result.data.pages +
		"页，总共" + result.data.total + "条记录");
	totalRecord = result.data.total;
	currentPage=result.data.pageNum;
	totalPage = result.data.pages;
}
//解析分页条数据
function build_movies_page_nav(result) {
	//console.log(result);
	$("#page_nav_area").empty();
	var ul = $("<ul></ul>").addClass("pagination");
	var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
	var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;").attr("href", "#"));
	var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;").attr("href", "#"));
	var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"));
	//如果没有前一页，前一页和首页就不能点
	if (result.data.hasPreviousPage == false) {
		firstPageLi.addClass("disabled");
		prePageLi.addClass("disabled");
	} else {
		//首页
		firstPageLi.click(function () {
			to_page(1);
		});
		prePageLi.click(function () {
			to_page(result.data.pageNum - 1);
		});
	}
	if (result.data.hasNextPage == false) {
		nextPageLi.addClass("disabled");
		lastPageLi.addClass("disabled");
	} else {
		//构建点击事件
		nextPageLi.click(function () {
			to_page(result.data.pageNum + 1);
		});
		lastPageLi.click(function () {
			to_page(result.data.lastPage);
		})
	}
	//添加首页和前一页
	ul.append(firstPageLi).append(prePageLi);
	//遍历添加页码
	$.each(result.data.navigatepageNums, function (index, item) {
		var numLi = $("<li></li>").append($("<a></a>").append(item).attr("href", "#"));
		//如果是当前选中页面，添加active标识
		if (result.data.pageNum == item) {
			numLi.addClass("active");
		}
		//给每个页码添加点击就跳转
		numLi.click(function () {
			to_page(item);
		});
		ul.append(numLi);
	});
	//添加下一页和末页
	ul.append(nextPageLi).append(lastPageLi);
	var navEle = $("<nav></nav>").append(ul);
	navEle.appendTo("#page_nav_area");
}

//添加电影
function adminAddMovie(){
	$("#trip_add_modal_btn").click(function () {
		//清除表单数据
		$("#tripAddModal form")[0].reset();
		$("#tripAddModal").modal({
			backdrop: "static"
		})
	});

	$("#movie_save_btn123").click(function () {
		alert("click")
		var moviename = $("#moviename_add_input").val();
		var moviearea = $("#moviearea_add_input").val();
		var movieintroduction = $("#movieintroduction_add_input").val();
		var moviedirector =$("#moviedirector_add_input").val();
		var movieactor = $("#movieactor_add_input").val();
		var movieyear =$("#movieyear_add_input").val();
		var movietime =$("#movietime_add_input").val();
		var movietype =$("#movietype_add_input").val();
		console.log(movietype)

		$.ajax({
			url: "/administrator/insertMovie",
			type: "POST",
			data:{name:moviename,area:moviearea, introduction:movieintroduction,director:moviedirector,actor:movieactor,publish_year:movieyear,time:movietime,type:movietype,image:"//"},
			dataType:"json",
			//contentType:"application/json;charset=UTF-8",
			success: function (result) {
				console.log("添加电影成功")
				$("#tripAddModal").modal('hide');
				/*
				if (result.code == 200 && result.data.message == "success"){
					//1.关闭modal框
					$("#tripAddModal").modal('hide');
					//2.来到最后一页，显示刚才保存的数据
					//to_page(totalPage);
				}else {
					//1.关闭modal框
					$("#tripAddModal").modal('hide');
					alert(result.data.message);
				}

				 */
			},
			error:function(result){
				console.log("添加电影失败")
			}
		});
	});

	}

	function movie_add_save(){
		var moviename = $("#moviename_add_input").val();
		var moviearea = $("#moviearea_add_input").val();
		var movieintroduction = $("#movieintroduction_add_input").val();
		var moviedirector =$("#moviedirector_add_input").val();
		var movieactor = $("#movieactor_add_input").val();
		var movieyear =$("#movieyear_add_input").val();
		var movietime =$("#movietime_add_input").val();
		var movietype =$("#movietype_add_input").val();
		var listimg=sessionStorage.imginf
		//console.log(movietype)

		$.ajax({
			url: "/administrator/insertMovie",
			type: "POST",
			data:{name:moviename,area:moviearea, introduction:movieintroduction,director:moviedirector,actor:movieactor,publish_year:movieyear,time:movietime,type:movietype,image:listimg},
			dataType:"text",
			//contentType:"application/json;charset=UTF-8",
			success: function (result) {
				console.log("添加电影成功")
				$("#tripAddModal").modal('hide');
				window.location.href="/admin/moviemanage"
			},
			error:function(result){
				console.log("添加电影失败")
			}
		});
	}

function deleteAddMovie() {
	$(document).on("click",".delete_btn",function () {
		//1.弹出确认删除对话框
		//var startDate=$(this).parents("tr").find("td:eq(4)").text().slice(0,10);
		//var carNum=$(this).parents("tr").find("td:eq(6)").text();
		var id=$(this).parents("tr").find("td:eq(1)").text();
		if(confirm("确认删除所选电影吗")){
			// alert(id);
			//确认，发送ajax请求删除
			$.ajax({
				url:"/administrator/deleteMovie",
				type:"get",
				data:{movieid:id,adminid:sessionStorage.onlineadminId},
				success:function (data) {
					console.log("电影删除成功")
					window.location.href="/admin/moviemanage"
				},
				error:function(data){
					console.log("电影删除失败")
				}
			})
		}
	})
}

function reviseMovie(){
	$(document).on("click",".edit_btn",function () {
		//清除表单数据
		$("#tripReviseModal form")[0].reset();

		var id= $(this).parent().parent().children("td").eq(1).text();
		//将id的值传递给修改按钮的属性，方便发送Ajax请求
		$("#trip_revise_btn").attr("edit-id",id);

		var moviename=$(this).parent().parent().children("td").eq(2).text();
		var moviearea=$(this).parent().parent().children("td").eq(3).text();
		var movieintroduction=$(this).parent().parent().children("td").eq(4).text();
		var moviedirector=$(this).parent().parent().children("td").eq(5).text();
		var movieactor=$(this).parent().parent().children("td").eq(6).text();
		var movieyear=$(this).parent().parent().children("td").eq(7).text();
		var movietime=$(this).parent().parent().children("td").eq(9).text();
		var movietype=$(this).parent().parent().children("td").eq(10).text();

		//var listimg=sessionStorage.imginf
		$("#moviename_revise_input").val(moviename);
		$("#moviearea_revise_input").val(moviearea);
		$("#movieintroduction_revise_input").val(movieintroduction);
		$("#moviedirector_revise_input").val(moviedirector);
		$("#movieactor_revise_input").val(movieactor);
		$("#movieyear_revise_input").val(movieyear);
		$("#movietime_revise_input").val(movietime);
		$("#movietype_revise_input").val(movietype);
		//console.log($("#movietype_add_input").val())
		$("#tripReviseModal").modal({
			backdrop: "static"
		})
	});
	//2.为模态框中的修改按钮绑定事件，更新员工信息
	$("#trip_revise_btn").click(function () {
		//2.验证通过后发送ajax请求保存更新的员工数据
		//如果要直接发送PUT之类的请求
		//在WEB.xml配置HttpPutFormContentFilter过滤器即可
		//这里未使用如上所述方法
		//获取编辑后的
		var id = $(this).attr("edit-id");
		var moviename = $("#moviename_revise_input").val();
		var moviearea = $("#moviearea_revise_input").val();
		var movieintroduction = $("#movieintroduction_revise_input").val();
		var moviedirector =$("#moviedirector_revise_input").val();
		var movieactor = $("#movieactor_revise_input").val();
		var movieyear =$("#movieyear_revise_input").val();
		var movietime =$("#movietime_revise_input").val();
		var movietype =$("#movietype_revise_input").val();

		$.ajax({
			url:"/administrator/updateMovie",
			type:"POST",
			data:{id:id,name:moviename,area:moviearea,introduction:movieintroduction,director:moviedirector,actor:movieactor,publish_year:movieyear,time:movietime,type:movietype,adminid:sessionStorage.onlineadminId},
			dataType:"text",
			//contentType:"application/json;charset=UTF-8",
			success:function () {
				//1.关闭modal框
				$("#tripReviseModal").modal('hide');
				//2.来到当前页，显示刚才保存的数据
				console.log("电影修改成功")
				window.location.href="/admin/moviemanage"
			},
			error:function(){
				console.log("电影修改失败")
			}
		})

	})
}
/********电影管理end*********/
/********用户管理start*********/
function getAllUser(){
	deleteAddUser()
	$.ajax({
		type:"get",
		url:"/administrator/getAllUsers",
		//data:{name:usrname,oldPassword:oldpwd,firstPassword:usrpwd1,secondPassword:usrpwd2},
		dataType:'json',
		success:function(userlist){
			console.log("获得全部用户列表成功")
			//解析全部列表
			build_users_table(userlist)
			//解析分页信息
			//build_movies_trip_page_info(movielist)
			//解析分页条数据
			//build_movies_page_nav(movielist)
		},
		error:function(userlist){
			console.log("获得全部用户列表失败")
		}
	})
}

function build_users_table(userlist){
	//清空table表格
	$("#users_table tbody").empty();
	//var users = result.data.list;

	//遍历元素
	$.each(userlist, function (index, item) {
		var checkBox=$("<td><input type='checkbox' class='check_item'/></td>");
		var id = $("<td></td>").append(item.id);
		var username = $("<td></td>").append(item.name);
		var usrpwd = $("<td></td>").append(item.password);
		var usrmail = $("<td></td>").append(item.mail);
		var uimg = "<img src='"+item.image+"' style='width:40%;height:180px;'>"
		var usrimg = $("<td></td>").append(uimg);

		//var button1 = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("编辑");
		var button2 = $("<button></button>").addClass("tn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden", true)).append("删除");
		var td_btn = $("<td></td>").append(button2);
		$("<tr></tr>").append(checkBox).append(id).append(username).append(usrpwd).append(usrmail).append(usrimg)
			.append(td_btn ).appendTo("#users_table tbody");

	})

}

function deleteAddUser() {
	$(document).on("click",".delete_btn",function () {
		//1.弹出确认删除对话框
		var username=$(this).parents("tr").find("td:eq(2)").text();
		var id=$(this).parents("tr").find("td:eq(1)").text();
		if(confirm("确认删除用户："+username+"吗？")){
			// alert(id);
			//确认，发送ajax请求删除
			$.ajax({
				url:"/administrator/deleteUser",
				type:"get",
				data:{userid:id,adminid:sessionStorage.onlineadminId},
				success:function (result) {
					console.log("用户删除成功")
					window.location.href="/admin/usrmanage"
				},
				error:function(result){
					console.log("用户删除失败")
				}
			})
		}
	})
}
/********用户管理end*********/
/********影评管理start*********/
function getAllComments(){
	deleteAddComment()
	$.ajax({
		type:"get",
		url:"/administrator/getAllComments",
		//data:{name:usrname,oldPassword:oldpwd,firstPassword:usrpwd1,secondPassword:usrpwd2},
		dataType:'json',
		success:function(commetnlist){
			console.log("获得全部评论列表成功")
			//解析全部列表
			build_comment_table(commetnlist)
			//解析分页信息
			//build_movies_trip_page_info(movielist)
			//解析分页条数据
			//build_movies_page_nav(movielist)
		},
		error:function(commentlist){
			console.log("获得全部评论列表失败")
		}
	})
}

function build_comment_table(commetnlist) {
	//清空table表格
	$("#orders_table tbody").empty();
	//var orders = result.data.list;

	//遍历元素
	$.each(commetnlist, function (index, item) {
		var checkBox=$("<td><input type='checkbox' class='check_item'/></td>");
		var id = $("<td></td>").append(item.id);
		var content = $("<td></td>").append(item.content);
		var time = $("<td></td>").append(item.time);
		var score = $("<td></td>").append(item.score);
		var userid = $("<td></td>").append(item.userid);
		var movieid = $("<td></td>").append(item.movieid);

		//var button1 = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("改变状态");
		var button2 = $("<button></button>").addClass("tn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden", true)).append("删除");
		var td_btn = $("<td></td>").append(button2);
		$("<tr></tr>").append(checkBox).append(id).append(content).append(time).append(score).append(userid).append(movieid)
			.append(td_btn ).appendTo("#orders_table tbody");

	})
}

function deleteAddComment(){
	$(document).on("click",".delete_btn",function () {
		//1.弹出确认删除对话框
		var id=$(this).parents("tr").find("td:eq(1)").text();
		if(confirm("确认删除影评号："+id+" 吗？")){
			//alert(id);
			//确认，发送ajax请求删除
			$.ajax({
				url:"/administrator/deleteComment",
				type:"get",
				data:{commentid:id,adminid:sessionStorage.onlineadminId},
				success:function (result) {
					console.log("评论删除成功")
					window.location.href="/admin/commentmanage"
				},
				error:function(result){
					console.log("评论删除失败")
				}
			})
		}
	})
}
/********影评管理end*********/
function pagetousr(){
	//window.location.href="/admin/usrmanage"
}