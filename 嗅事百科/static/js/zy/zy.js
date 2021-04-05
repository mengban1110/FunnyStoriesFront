
$(function() {


	$("#bottom-right1").css("display", "inline");
	$("#bottom-right2").css("display", "none");
	$("#bottom-right3").css("display", "none");
	$("#bottom-right4").css("display", "none");






	var username = getCookie("username");
	var useravatar = getCookie("useravatar");
	var token = getCookie("token");


	// $("#username").html(username);
	// var img = '<img id="middle-head" src="'+useravatar+'" >';
	// $("#middle-head-frame").html(img);







	mypost(lookUser, {
		"userid": getUrl("userid"),
		"token": getCookie("token")
	}, function(data) {

		console.log(data)
		if (data.code == 200) {
			tempUid = data.data.postinfo.userinfo.uid;
			$("#postlikecount").html(data.data.postinfo.count.postlikecount);
			$("#postcount").html(data.data.postinfo.count.postcount);
			$("#commentcount").html(data.data.postinfo.count.commentcount);

			$("#uid").html(data.data.postinfo.userinfo.uid);
			$("#usersex").html(data.data.postinfo.userinfo.usersex);
			$("#usersign").html(data.data.postinfo.userinfo.usersign);
			$("#userbirth").html(data.data.postinfo.userinfo.userbirth);
			$("#bottom-right3").html("");
			var myname = data.data.postinfo.userinfo.uname;
			var myuseravatar = data.data.postinfo.userinfo.useravatar;
			var img = '<img id="middle-head" src=' + myuseravatar + '>';
			$("#middle-head-frame").html(img)
			$("#username").html(myname)
			// $("#middle-head")
			data.data.postinfo.history.forEach(item => {

				//用户浏览了什么
				if (data.data.postinfo.postimg == null) {
					//文本
					$("#bottom-right1").append(lywb(item.postid, item.posttext, item.createtime))
				} else {
					//图片
					$("#bottom-right1").append(lytp(item.postid, item.posttext, item.postimg, item.createtime))
				}



			})
			//用户的评论
			data.data.postcomment.forEach(item => {
				try {
					$("#bottom-right3").append(pl(myname, item.userinfo.useravatar, item.userinfo.username, item.userinfo.userid,
						item.commenttext, item.postid))
				} catch (e) {}

			})
			$("#bottom-right2").html("");
			//用户的发帖
			data.data.post.forEach(item => {
				$("#bottom-right2").append(ft(myname, myuseravatar, item.createtime, item.count.like, item.count.comment,
					item.postid, item.posttext, item.postimg, item.postvideo))
			})
		}
	}, "GET");
})



layui.use('form', function() {
	var form = layui.form;
	form.render();
});

function clickafter(obj) {
	//清空其它同类按钮选中颜色
	$('.down-button-zy').css("border-bottom", "0px"); //按钮原来颜色
	$('.down-button-qs').css("border-bottom", "0px"); //按钮原来颜色
	$('.down-button-pl').css("border-bottom", "0px"); //按钮原来颜色
	$('.down-button-grxx').css("border-bottom", "0px"); //按钮原来颜色
	//点击后变色

	$(obj).css("border-bottom", "5px solid saddlebrown");
	if ($(obj).text() == "主页") {

		$("#bottom-right1").css("display", "inline");
		$("#bottom-right2").css("display", "none");
		$("#bottom-right3").css("display", "none");
		$("#bottom-right4").css("display", "none");
	}
	if ($(obj).text() == "糗事") {

		$("#bottom-right1").css("display", "none");
		$("#bottom-right2").css("display", "inline");
		$("#bottom-right3").css("display", "none");
		$("#bottom-right4").css("display", "none");
	}
	if ($(obj).text() == "评论") {

		$("#bottom-right1").css("display", "none");
		$("#bottom-right2").css("display", "none");
		$("#bottom-right3").css("display", "inline");
		$("#bottom-right4").css("display", "none");
	}
	if ($(obj).text() == "个人信息") {

		$("#bottom-right1").css("display", "none");
		$("#bottom-right2").css("display", "none");
		$("#bottom-right3").css("display", "none");
		$("#bottom-right4").css("display", "inline");
	}
}


function getUrl(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
	if (r != null) return unescape(r[2]);
	return null;
}



//浏览文本
function lywb(postid, posttext, createtime) {
	var month = createtime.split(" ")[0].split("-")[1];
	var day = createtime.split(" ")[0].split("-")[2];
	var div = '<div id="bottom-right-pj">\n' +
		'\t\t\t\t\t\n' +
		'\t\t\t\t\t\t<div>\n' +
		'\t\t\t\t\t\t\t<span id="month">\n' +
		'\t\t\t\t\t\t\t\t' + month + '\n' +
		'\t\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t\t<span id="break">\n' +
		'\t\t\t\t\t\t\t\t&#47;\n' +
		'\t\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t\t<span id="day">\n' +
		'\t\t\t\t\t\t\t\t' + day + '\n' +
		'\t\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t</div>\n' +
		'\t\t\t\t\t\t<ul>\n' +
		'\t\t\t\t\t\t\t<li id="bottom-right-pj-up">\n' +
		'\t\t\t\t\t\t\t\t<strong>\n' +
		'\t\t\t\t\t\t\t\t\t' + postid + '\n' +
		'\t\t\t\t\t\t\t\t</strong>\n' +
		'\t\t\t\t\t\t\t\t发表了糗事\n' +
		'\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t\t<li id="bottom-right-pj-middle">\n' +
		'\t\t\t\t\t\t\t\t<a href="#" target="_blank">\n' +
		'\t\t\t\t\t\t\t\t\t' + posttext + '\n' +
		'\t\t\t\t\t\t\t\t</a>\n' +

		'\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t\n' +
		'\t\t\t\t\t\n' +
		'\t\t\t\t\t\t\t<li id="bottom-right-pj-down">\n' +
		'\t\t\t\t\t\t\t\t261 好笑 &sdot;\n' +
		'\t\t\t\t\t\t\t\t13 评论 &sdot;\n' +
		'\t\t\t\t\t\t\t\t发表于\n' +
		'\t\t\t\t\t\t\t\t<a href="#" target="_blank">\n' +
		'\t\t\t\t\t\t\t\t2021-03-28\n' +
		'\t\t\t\t\t\t\t\t</a>\n' +
		'\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t</ul>\n' +
		'\t\t\t\t\t</div>';
	return div;
}

//浏览图片
function lytp(postid, posttext, createtime, postimg) {
	var month = createtime.split(" ")[0].split("-")[1];
	var day = createtime.split(" ")[0].split("-")[2];
	var div = '<div id="bottom-right-pj">\n' +
		'\t\t\t\t\t\n' +
		'\t\t\t\t\t\t<div>\n' +
		'\t\t\t\t\t\t\t<span id="month">\n' +
		'\t\t\t\t\t\t\t\t' + month + '\n' +
		'\t\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t\t<span id="break">\n' +
		'\t\t\t\t\t\t\t\t&#47;\n' +
		'\t\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t\t<span id="day">\n' +
		'\t\t\t\t\t\t\t\t' + day + '\n' +
		'\t\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t</div>\n' +
		'\t\t\t\t\t\t<ul>\n' +
		'\t\t\t\t\t\t\t<li id="bottom-right-pj-up">\n' +
		'\t\t\t\t\t\t\t\t<strong>\n' +
		'\t\t\t\t\t\t\t\t\t' + postid + '\n' +
		'\t\t\t\t\t\t\t\t</strong>\n' +
		'\t\t\t\t\t\t\t\t发表了糗事\n' +
		'\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t\t<li id="bottom-right-pj-middle">\n' +
		'\t\t\t\t\t\t\t\t<a href="#" target="_blank">\n' +
		'\t\t\t\t\t\t\t\t\t' + posttext + '\n' +
		'\t\t\t\t\t\t\t\t</a>\n' +
		'\t\t\t\t<img id="img-tx" src=' + postimg + ' alt="撩汉大婶" alt="撩汉大婶">撩汉大婶\n' +
		'\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t\n' +
		'\t\t\t\t\t\n' +
		'\t\t\t\t\t\t\t<li id="bottom-right-pj-down">\n' +
		'\t\t\t\t\t\t\t\t261 好笑 &sdot;\n' +
		'\t\t\t\t\t\t\t\t13 评论 &sdot;\n' +
		'\t\t\t\t\t\t\t\t发表于\n' +
		'\t\t\t\t\t\t\t\t<a href="#" target="_blank">\n' +
		'\t\t\t\t\t\t\t\t2021-03-28\n' +
		'\t\t\t\t\t\t\t\t</a>\n' +
		'\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t</ul>\n' +
		'\t\t\t\t\t</div>';
	return div;
}
//用户评论
function pl(myname, useravatar, username, userid, commenttext, postid) {
	var div = '<div id="bottom-right3-pinglun">\n' +
		'\n' +
		'\t\t\t\t\t<!--判断是否评论，因为加了推荐的帖子-->\n' +
		'\n' +
		'\t\t\t\t\t<div id="bottom-right3-pinglun-user-toolbar">\n' +
		'\n' +
		'\t\t\t\t\t</div>\n' +
		'\t\t\t\t\t<div id="bottom-right3-pinglun-user-date">\n' +
		'\t\t\t\t\t\t<span id="bottom-right3-pinglun-user-date-month">\n' +
		'\t\t\t\t\t\t\t03\n' +
		'\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t<span id="bottom-right3-pinglun-user-date-break">\n' +
		'\t\t\t\t\t\t\t/\n' +
		'\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t\t<span id="bottom-right3-pinglun-user-date-day">\n' +
		'\t\t\t\t\t\t\t31\n' +
		'\t\t\t\t\t\t</span>\n' +
		'\t\t\t\t\t</div>\n' +
		'\t\t\t\t\t<ul id="bottom-right3-pinglun-user-indent">\n' +
		'\t\t\t\t\t\t<li>\n' +
		'\n' +
		'\t\t\t\t\t\t\t<strong>' + myname + '</strong>\n' +
		'\t\t\t\t\t\t\t评论了\n' +
		'\t\t\t\t\t\t\t<strong>' + username + '</strong>\n' +
		'\t\t\t\t\t\t\t发表的糗事\n' +
		'\n' +
		'\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t<li>\n' +
		'\t\t\t\t\t\t\t' + commenttext + '\n' +
		'\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t<li id="bottom-right3-pinglun-user-comment-quote">\n' +
		'\t\t\t\t\t\t\t<ul>\n' +
		'\t\t\t\t\t\t\t\t<li>\n' +
		'\n' +
		'\t\t\t\t\t\t\t\t\t<a href="/users/38730746/">\n' +
		'\t\t\t\t\t\t\t\t\t\t<img src="' + useravatar + '">\n' +
		'\t\t\t\t\t\t\t\t\t</a>\n' +
		'\t\t\t\t\t\t\t\t\t<a href="/users/38730746/">\n' +
		'\t\t\t\t\t\t\t\t\t\t' + username + '\n' +
		'\t\t\t\t\t\t\t\t\t</a>\n' +
		'\n' +
		'\t\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t\t\t<li>\n' +
		'\t\t\t\t\t\t\t\t\t<a href="pageinfo.html?postid=' + postid + '" target="_blank">\n' +
		'\t\t\t\t\t\t\t\t\t\t' + commenttext + '\n' +
		'\t\t\t\t\t\t\t\t\t</a>\n' +
		'\t\t\t\t\t\t\t\t</li>\n' +
		'\n' +
		'\t\t\t\t\t\t\t\t<li>\n' +
		'\n' +
		'\n' +
		'\n' +
		'\t\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t</ul>\n' +
		'\n' +
		'\t\t\t\t</div>';
	return div;
}

function ft(myname, myuseravatar, createtime, like, comment, postid, posttext, postimg, postvideo) {

	var front = '<div id="bottom-right2-qiushi">\n' +
		'\t\t\t\t<div class="bottom-right2-qiushi-user-toolbar">\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t</div>\n' +
		'\t\t\t\t<ul>\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t<li>\n' +
		'\t\t\t\t<img id="img-tx" src=' + myuseravatar + '>' + myname + '\n' +
		'\t\t\t\t</li>\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t<li>\n' +
		'\t\t\t\t<a href="/article/124206944" target="_blank">\n';

	if (posttext) {
		front += '\t\t\t\t' + posttext + '\n' +
			'\t\t\t\t</a>\n' +
			'\t\t\t\t</li>\n' +
			'\t\t\t\t\n';
	}
	if (postimg) {
		front += '\t\t\t\t<img  id="img-tp" src=' + postimg + ' >\n' +
			'\t\t\t\t</a>\n' +
			'\t\t\t\t</li>\n' +
			'\t\t\t\t\n';
	}
	if (postvideo) {
		front += '\t\t\t\t<li>\n' +
			'\t\t\t\t\n' +
			'\t\t\t\t\n' +
			'\t\t\t\t' +
			'\t\t\t\t<video controls="controls" preload="meta" width="480" height="480">\n' +
			'\t\t\t\t<source src=' + postvideo + ' type="video/mp4" />\n' +
			'\t\t\t\t</video>\n' +
			'\t\t\t\t\n' +
			'\t\t\t\t\n' +
			'\t\t\t\t<li>\n';
	}
	var div = front +

		'\t\t\t\t\n' +
		'\t\t\t\t<li>\n' +
		'\t\t\t\t' + like + ' 好笑 &sdot;\n' +
		'\t\t\t\t ' + comment + ' 评论 &sdot;\n' +
		'\t\t\t\t发表于\n' +
		'\t\t\t\t<a href="/history/87792b7d7c02f676aadcc80e25ed5104/" target="_blank">\n' +
		'\t\t\t\t2021-04-03\n' +
		'\t\t\t\t</a>\n' +
		'\t\t\t\t</li>\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t<li >\n' +
		'\t\t\t\t<span></span>\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t<a href="/users/13664198/">\n' +
		'\t\t\t\t' + myname + '\n' +
		'\t\t\t\t</a>,\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t与另外 ' + like + ' 人觉的好笑\n' +
		'\t\t\t\t</li>\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t</ul>\n' +
		'\t\t\t\t</div>';
	return div;
}
var tempUid;
var tempBirth = "121212121";
var tempSign = "121212121";
var tempUsername = "121212121";
layui.use('upload', function(){
  var $ = layui.jquery
  ,upload = layui.upload;
	upload.render({
			elem: '#selecfile',
			url: domain+changeUserInfo, //改成您自己的上传接口
			auto: false,
			bindAction: '#eiditUser',
			choose: function(obj) {
				tempBirth = $("#userbirth2").val();
				tempSign = $("#usersign2").val();
				tempUsername = $("#userName2").val();
			},
			done: function(res) {
				if(res.code !==200){
					alert("你不能修改别人用户");
					window.location.href = "index.html";
				}else{
				window.location.href = "zy.html?userid=" + tempUid;
				console.log(res)
				}
			},
			before: function() {
				this.data = {
					"uid": tempUid,
					"username": tempUsername,
					"usersex": $("input[name='sex']:checked").val(),
					"userbirth": tempBirth,
					"usersign": tempSign,
					"token": getCookie("token")
					
				}
			},
			// data: {
			// 	"uid": tempUid,
			// 	"username": tempUsername,
			// 	"usersex": $("input[name='sex']:checked").val(),
			// 	"userbirth": tempBirth,
			// 	"usersign": tempSign,
			// 	"token": getCookie("token")
			// },
			error(index,upload){
				window.location.href = "zy.html?userid=" + tempUid;
			}
		});
});

function index(){
	window.location.href="index.html"
}