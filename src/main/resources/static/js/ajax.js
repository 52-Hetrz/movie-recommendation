
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
	if(sessionStorage.loginStatus==undefined)
	sessionStorage.loginStatus=0
}
function usrlogout(){
	if(sessionStorage.loginStatus==1){
		sessionStorage.loginStatus=0
		window.location.href="userPage"
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
	if(sessionStorage.loginStatus==0){
		document.getElementById('page-wrapper').innerHTML='<form action="login" method="post" id="loginForm" style="position:absolute;left:40%;"><fieldset id="body"><fieldset><label for="name">用户名</label><input type="text" name="name" id="usr-page-name"></fieldset><fieldset><label for="password">密码</label><input type="password" name="password" id="usr-page-password"></fieldset><p class="warning" id="usr-page-login-warning"></p><input type="button" id="login" value="Login" onclick="userPageLogin()"><label for="checkbox"><input type="checkbox" id="checkbox"> <i>Remember me</i></label></fieldset><span><a href="#">Forgot your password?</a></span></form>'
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
