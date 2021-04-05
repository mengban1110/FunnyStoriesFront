
$(function(){
	// var postid = getCookie("tzid");
	var postid = getQueryString("postid")
	post(postid);
	postpinglun(postid);
	gg();
	shifoudl();
})		

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}



function pagez(){
	
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage //分页 
			var layer = layui.layer //弹层

			//分页
			laypage.render({
				elem: 'pageDemo', //分页容器的id
				count: 20, //总页数
				skin: '#1E9FFF', //自定义选中色值
				//,skip: true //开启跳页
				jump: function(obj, first) {
					$("#pinglun").empty() 
					post(postid)
					if (!first) {
						layer.msg('第' + obj.curr + '页', {
							offset: 'b'
						});
					}
				}
			});
		
		});

}

function postpinglun(postid){
	
	
		mypost(getpostbyid,{"postid":postid},function(data){
			console.log(data)
			if (data.code == 200) {
			
					//评论
					data.data.postcomment.forEach(item => {
						
						$("#pinglun").append(pl(item.userinfo.username,item.userinfo.userid,item.commentid,item.commenttext));	
					
						
							
						
					})
				
			}else{
				console.log("非法调用")
			}
		},"GET")
	}





function post(postid){

	mypost(getpostbyid,{"postid":postid},function(data){
		console.log(data)
		if (data.code == 200) {
				//用户信息
				$("#col-sm-2").append(tiezitx(data.data.postinfo.userinfo.uname,data.data.postinfo.userinfo.uid,data.data.postinfo.userinfo.useravatar,data.data.postinfo.userinfo.postcount,data.data.postinfo.userinfo.postlikecount,data.data.postinfo.count.like,data.data.postinfo.count.comment,data.data.postinfo.postid,data.data.postinfo.posttext,data.data.postinfo.createtime))
				
				//帖子内容
				if(data.data.postinfo.postimg=="" && data.data.postinfo.postvideo==null){
				$("#teizinr").append(teiziwb(data.data.postinfo.userinfo.uname,data.data.postinfo.userinfo.uid,data.data.postinfo.userinfo.useravatar,data.data.postinfo.userinfo.postcount,data.data.postinfo.userinfo.postlikecount,data.data.postinfo.count.like,data.data.postinfo.count.comment,data.data.postinfo.postid,data.data.postinfo.posttext,data.data.postinfo.createtime))
				}else if(data.data.postinfo.postvideo=="" || data.data.postinfo.postvideo==null){
				$("#teizinr").append(teizitp(data.data.postinfo.userinfo.uname,data.data.postinfo.userinfo.uid,data.data.postinfo.userinfo.useravatar,data.data.postinfo.userinfo.postcount,data.data.postinfo.userinfo.postlikecount,data.data.postinfo.count.like,data.data.postinfo.count.comment,data.data.postinfo.postid,data.data.postinfo.posttext,data.data.postinfo.postimg,data.data.postinfo.createtime))
				}else if(data.data.postinfo.postimg==""){
				$("#teizinr").append(teizisp(data.data.postinfo.userinfo.uname,data.data.postinfo.userinfo.uid,data.data.postinfo.userinfo.useravatar,data.data.postinfo.userinfo.postcount,data.data.postinfo.userinfo.postlikecount,data.data.postinfo.count.like,data.data.postinfo.count.comment,data.data.postinfo.postid,data.data.postinfo.posttext,data.data.postinfo.postvideo,data.data.postinfo.createtime))
				}
				
				
				//评论
				// data.data.postcomment.forEach(item => {
				// 	$("#pinglun").append(pl(item.userinfo.username,item.userinfo.userid,item.commentid,item.commenttext));	
				// 	var pinglunsz[data.data.postcomment.length/5+1];
				// 	var a = 0;
				// 	for (var i = 0 ; i <data.data.postcomment.length ;i++){
				// 		pinglunsz[a] = 
				// 	}
				// })
				
				//推荐
				$("#tuijian").append(tj());
				
		}else{
			console.log("非法调用")
		}
	},"GET")
}

//帖子用户头像
function tiezitx(uname,uid,useravatar,postcount,postlikecount,like,comment,postid,posttext,createtime){
	var div = '<div class="col0">\n' +
	'\t\t\t\t<div class="detail-col0" id="articleSideLeft">\n' +
	'\t\t\t\t<!-- userinfo -->\n' +
	'\t\t\t\t<a class="side-left-userinfo">\n' +
	'\t\t\t\t\n' +
	'\t\t\t\t<img style="cursor: pointer;" onclick="tzuser('+uid+')" src='+useravatar+' alt="">\n' +
	'\t\t\t\t\n' +
	'\t\t\t\t<div class="side-user-top">\n' +
	'\t\t\t\t<span class="side-user-name" style="cursor: pointer;" onclick="tzuser('+uid+')">'+uname+'</span>\n' +
	'\t\t\t\t\n' +
	'\t\t\t\t<span class="side-fans-num userF"><i></i>22</span>\n' +
	'\t\t\t\t\n' +
	'\t\t\t\t</div>\n' +
	'\t\t\t\t<div class="side-user-info clearfix">\n' +
	'\t\t\t\t<div class="side-detail">\n' +
	'\t\t\t\t<div class="side-line1">'+postlikecount+'</div>\n' +
	'\t\t\t\t<div class="side-line2">好笑</div>\n' +
	'\t\t\t\t</div>\n' +
	'\t\t\t\t<div class="side-detail">\n' +
	'\t\t\t\t<div class="side-line1">'+postlikecount+'</div>\n' +
	'\t\t\t\t<div class="side-line2">粉丝</div>\n' +
	'\t\t\t\t</div>\n' +
	'\t\t\t\t<div class="side-detail">\n' +
	'\t\t\t\t<div class="side-line1">'+postcount+'</div>\n' +
	'\t\t\t\t<div class="side-line2">糗事</div>\n' +
	'\t\t\t\t</div>\n' +
	'\t\t\t\t</div>\n' +
	'\t\t\t\t</a>\n' +
	'\t\t\t\t</div>\n' +
	'\t\t\t\t</div>'
	return div;
}

//文本帖子
function teiziwb(uname,uid,useravatar,postcount,postlikecount,like,comment,postid,posttext,createtime){
	var div = '<h1 class="article-title">\n' +
    '\t\t\t\t\t'+posttext+'\n' +
    '\t\t\t\t\t</h1>\n' +
    '\t\t\t\t\t<div class="stats">\n' +
    '\t\t\t\t\t\t<span class="stats-time">\n' +
    '\t\t\t\t\t\t'+createtime+'\n' +
    '\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\n' +
    '\t\t\t\t\t\t<span class="stats-vote">好笑数：<i class="number">'+like+'</i></span>\n' +
    '\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t<br />\n' +
    '                        <div class="topic-test-content-text">'+posttext+'</div>\n' +
    '                    <div class="topic-test-bottom">\n' +
    '                        <div class="topic-test-bottom-img">\n' +
    '                            <div class="topic-test-bottom-img-nr"  style="fill: rgb(0, 0, 0);"><svg  onclick="dianzan('+postid+');" t="1616177381475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1147" width="128" height="128"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-977.408C254.976 46.592 46.592 254.976 46.592 512s208.384 465.408 465.408 465.408 465.408-208.384 465.408-465.408c-0.512-257.024-208.384-464.896-465.408-465.408z" id="bian" fill="#bfbfbf" p-id="1148"></path><path id="limian" d="M268.8 371.2c0 34.304 27.648 61.952 61.952 61.952 34.304 0 61.952-27.648 61.952-61.952 0-34.304-27.648-61.952-61.952-61.952-34.304-0.512-61.952 27.648-61.952 61.952zM630.784 371.2c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-34.304-27.648-61.952-61.952-61.952s-61.952 27.648-61.952 61.952zM512 841.216c-155.648-2.56-280.576-129.024-281.088-284.672 0-12.8 10.24-23.04 23.04-23.552l258.048-2.56h259.072c12.8 0 23.04 10.24 23.04 23.04 1.536 157.696-124.928 286.72-282.112 287.744z m-233.472-261.12c12.288 120.32 112.64 212.48 233.472 214.528 122.368-1.536 224.256-95.744 235.008-218.112H512l-233.472 3.584z" fill="#bfbfbf" p-id="1149" ></path></svg>\n' +
    '								<div id="like">'+like+'</div>\n'+
    '                            </div>\n' +
    '                            <div class="topic-test-bottom-img-nr"><svg onclick="showpl();"  t="1616177521435" class="icon" viewBox="0 0 1058 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2664" width="128" height="128"><path d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0" p-id="2665" fill="#cdcdcd"></path></svg>\n' +
    '								<div id="pingluncount">'+comment+'</div>\n'+
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
	'<div class="form-group" id="pinglun-kuang">\n' +
	    '    <label for="exampleInputPassword1">写评论:</label>\n' +
	    '    <input type="text" class="form-control" id="xpinglun">\n' +
		'<button type="button" style="margin-top:10px;width:70px;background-color:#ffd600;font-size=24;" onclick="fabu();" id="fabu" class="btn btn-primary">发布</button>\n'+
	    '  </div>'
    '\t\t\t\t\t<br />'
	
	
	return div;
}

//图片帖子
function teizitp(uname,uid,useravatar,postcount,postlikecount,like,comment,postid,posttext,postimg,createtime){
	
	postimg = postimg.substr(0,postimg.length-1);
	postimg = postimg.substr(1,postimg.length);
	var postimgs = postimg.split(",");
	
	var imgs ="";
	for(var i=0;i<postimgs.length;i++){
		imgs += '<img class="topic-test-content-img-1" src='+postimgs[i]+' data-preview-group="1616176402934-17-qsub" data-preview-src=""><br/>'
	}
	
	var div='<h1 class="article-title">\n' +
	    '\t\t\t\t\t'+posttext+'\n' +
	    '\t\t\t\t\t</h1>\n' +
	    '\t\t\t\t\t<div class="stats">\n' +
	    '\t\t\t\t\t\t<span class="stats-time">\n' +
	    '\t\t\t\t\t\t'+createtime+'\n' +
	    '\t\t\t\t\t\t</span>\n' +
	    '\t\t\t\t\t\t\n' +
	    '\t\t\t\t\t\t<span class="stats-vote">好笑数：<i class="number">'+like+'</i></span>\n' +
	    '\t\t\t\t\t</div>\n' +
	    '\t\t\t\t\t<br />\n' +
		'                        <div class="topic-test-content-text" style="cursor: pointer;" onclick="teizi('+postid+');">'+posttext+'</div>'+imgs+'</div>\n' +
	    '                    <div class="topic-test-bottom">\n' +
	    '                        <div class="topic-test-bottom-img">\n' +
	    '                            <div class="topic-test-bottom-img-nr" style="fill: rgb(0, 0, 0);"><svg onclick="dianzan('+postid+');" t="1616177381475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1147" width="128" height="128"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-977.408C254.976 46.592 46.592 254.976 46.592 512s208.384 465.408 465.408 465.408 465.408-208.384 465.408-465.408c-0.512-257.024-208.384-464.896-465.408-465.408z" fill="#bfbfbf" id="bian" p-id="1148"></path><path id="limian" d="M268.8 371.2c0 34.304 27.648 61.952 61.952 61.952 34.304 0 61.952-27.648 61.952-61.952 0-34.304-27.648-61.952-61.952-61.952-34.304-0.512-61.952 27.648-61.952 61.952zM630.784 371.2c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-34.304-27.648-61.952-61.952-61.952s-61.952 27.648-61.952 61.952zM512 841.216c-155.648-2.56-280.576-129.024-281.088-284.672 0-12.8 10.24-23.04 23.04-23.552l258.048-2.56h259.072c12.8 0 23.04 10.24 23.04 23.04 1.536 157.696-124.928 286.72-282.112 287.744z m-233.472-261.12c12.288 120.32 112.64 212.48 233.472 214.528 122.368-1.536 224.256-95.744 235.008-218.112H512l-233.472 3.584z" fill="#bfbfbf" p-id="1149"></path></svg>\n' +
	    '								<div id="like">'+like+'</div>\n'+
	    '                            </div>\n' +
	    '                            <div class="topic-test-bottom-img-nr"><svg onclick="showpl();"  t="1616177521435" class="icon" viewBox="0 0 1058 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2664" width="128" height="128"><path d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0" p-id="2665" fill="#cdcdcd"></path></svg>\n' +
	    '								<div id="pingluncount">'+comment+'</div>\n'+
	    '                            </div>\n' +
	    '                        </div>\n' +
	    '                    </div>\n' +
		'<div class="form-group" id="pinglun-kuang">\n' +
		    '    <label for="exampleInputPassword1">写评论:</label>\n' +
		    '    <input type="text" class="form-control" id="xpinglun">\n' +
			'<button type="button" style="margin-top:10px;width:70px;background-color:#ffd600;font-size=24;" onclick="fabu();" id="fabu" class="btn btn-primary">发布</button>\n'+
		    '  </div>'
		'\t\t\t\t\t<br />'
		return div;
}



//视频帖子
function teizisp(uname,uid,useravatar,postcount,postlikecount,like,comment,postid,posttext,postvideo,createtime){
	var div='<h1 class="article-title">\n' +
	    '\t\t\t\t\t'+posttext+'\n' +
	    '\t\t\t\t\t</h1>\n' +
	    '\t\t\t\t\t<div class="stats">\n' +
	    '\t\t\t\t\t\t<span class="stats-time">\n' +
	    '\t\t\t\t\t\t'+createtime+'\n' +
	    '\t\t\t\t\t\t</span>\n' +
	    '\t\t\t\t\t\t\n' +
	    '\t\t\t\t\t\t<span class="stats-vote">好笑数：<i class="number">'+like+'</i></span>\n' +
	    '\t\t\t\t\t</div>\n' +
	    '\t\t\t\t\t<br />\n' +
	    '\t\t\t\t\t<video id="article-video" controls=""  poster="" width="100%" preload="auto" playsinline="true" webkit-playsinline="true">\n' +
	    '\t\t\t\t\t<source src='+postvideo+' type="video/mp4">\n' +
	    '\t\t\t\t\t</video>\n' +
		'                    <div class="topic-test-bottom">\n' +
		'                        <div class="topic-test-bottom-img">\n' +
		'                            <div class="topic-test-bottom-img-nr" style="fill: rgb(0, 0, 0);"><svg onclick="dianzan('+postid+');" t="1616177381475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1147" width="128" height="128"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-977.408C254.976 46.592 46.592 254.976 46.592 512s208.384 465.408 465.408 465.408 465.408-208.384 465.408-465.408c-0.512-257.024-208.384-464.896-465.408-465.408z" fill="#bfbfbf" id="bian" p-id="1148"></path><path  id="limian" d="M268.8 371.2c0 34.304 27.648 61.952 61.952 61.952 34.304 0 61.952-27.648 61.952-61.952 0-34.304-27.648-61.952-61.952-61.952-34.304-0.512-61.952 27.648-61.952 61.952zM630.784 371.2c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-34.304-27.648-61.952-61.952-61.952s-61.952 27.648-61.952 61.952zM512 841.216c-155.648-2.56-280.576-129.024-281.088-284.672 0-12.8 10.24-23.04 23.04-23.552l258.048-2.56h259.072c12.8 0 23.04 10.24 23.04 23.04 1.536 157.696-124.928 286.72-282.112 287.744z m-233.472-261.12c12.288 120.32 112.64 212.48 233.472 214.528 122.368-1.536 224.256-95.744 235.008-218.112H512l-233.472 3.584z" fill="#bfbfbf" p-id="1149"></path></svg>\n' +
		'								<div id="like">'+like+'</div>\n'+
		'                            </div>\n' +
		'                            <div class="topic-test-bottom-img-nr"><svg onclick="showpl();" t="1616177521435" class="icon" viewBox="0 0 1058 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2664" width="128" height="128"><path d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0" p-id="2665" fill="#cdcdcd"></path></svg>\n' +
		'								<div id="pingluncount">'+comment+'</div>\n'+
		'                            </div>\n' +
		'                        </div>\n' +
		'                    </div>\n' +
		'<div class="form-group" id="pinglun-kuang">\n' +
		    '    <label for="exampleInputPassword1">写评论:</label>\n' +
		    '    <input type="text" class="form-control" id="xpinglun">\n' +
			'<button type="button" style="margin-top:10px;width:70px;background-color:#ffd600;font-size=24;" onclick="fabu();" id="fabu" class="btn btn-primary">发布</button>\n'+
		    '  </div>'
	    '\t\t\t\t\t<br />'
		return div;
}



//评论
function pl(username,userid,commentid,commenttext){
	var div = '<div id="comment-418111508" class="comment-block clearfix floor-8"><div class="replay">  <a style="cursor: pointer;" onclick="tzuser('+userid+')" class="userlogin" target="_blank" title='+username+'>'+username+'：</a>  <span class="body">'+commenttext+'</span></div></div>';
	
	return div;
}


//推荐	
function tj(){
	mypost(getrecommend,{page:1,size:10},function(data){
		console.log(data)
		if (data.code == 200) {
			
			data.data.postinfo.forEach(item => {
				
				$("#tuijian").append(add(item.userinfo.uid,item.userinfo.uname,item.userinfo.useravatar,item.count.like,item.count.comment,item.postid,item.posttext,item.postimg,item.createtime,item.postvideo))
			})
		}else{
			console.log("非法调用")
		}
	},"GET")
}
function add(uid,uname,useravatar,like,comment,postid,posttext,postimg,createtime,postvideo){
	if(postimg==null && postvideo==null){
		var div = '<div class="article01">\n' +
		'                    <div class="article01_img" style="cursor: pointer;" onclick="teizi('+postid+');">\n' +
		'                        <img src="http://static.qiushibaike.com/images/web/v4/textDefault.png?v=12eaf94cfd4d3ae0423a3925bb5bbf9c" alt="">\n' +
		'                    </div>\n' +
		'                    <div class="article01_content">\n' +
		'                        <div class="article01_content_title" style="cursor: pointer;"  id="text" onclick="teizi('+postid+');">'+posttext+'</div>\n' +
		'                        <div class="article01_content_info">\n' +
		'                            <div>\n' +
		'                                <span>'+like+'</span>\n' +
		'                                <span>好笑</span>\n' +
		'                                <span>·</span>\n' +
		'                                <span>'+comment+'</span>\n' +
		'                                <span>评论</span>\n' +
		'                            </div>\n' +
		'                            <div class="article01_user">\n' +
		'                                <img onclick="tzuser('+uid+')" style="cursor: pointer;" src='+useravatar+' alt="">\n' +
		'                                <span onclick="tzuser('+uid+')" style="cursor: pointer;">'+uname+'</span>\n' +
		'                            </div>\n' +
		'                        </div>\n' +
		'                    </div>\n' +
		'                </div>'
		
	
	}else if(postvideo!=null){
		
			var div = '<div class="article01">\n' +
			'                    <div class="article01_img" style="cursor: pointer;" onclick="teizi('+postid+');">\n' +
			'                        <img src='+postvideo+'?vframe/jpg/offset/8/w/300/h/200 alt="">\n' +
			'                    </div>\n' +
			'                    <div class="article01_content">\n' +
			'                        <div class="article01_content_title" style="cursor: pointer;"  id="text" onclick="teizi('+postid+');">'+posttext+'</div>\n' +
			'                        <div class="article01_content_info">\n' +
			'                            <div>\n' +
			'                                <span>'+like+'</span>\n' +
			'                                <span>好笑</span>\n' +
			'                                <span>·</span>\n' +
			'                                <span>'+comment+'</span>\n' +
			'                                <span>评论</span>\n' +
			'                            </div>\n' +
			'                            <div class="article01_user">\n' +
			'                                <img onclick="tzuser('+uid+')" style="cursor: pointer;" src='+useravatar+' alt="">\n' +
			'                                <span onclick="tzuser('+uid+')" style="cursor: pointer;">'+uname+'</span>\n' +
			'                            </div>\n' +
			'                        </div>\n' +
			'                    </div>\n' +
			'                </div>'
	}else{
		postimg = postimg.substr(0,postimg.length-1);
		postimg = postimg.substr(1,postimg.length);
		var postimgs = postimg.split(",");
			var div = '<div class="article01">\n' +
			'                    <div class="article01_img" style="cursor: pointer;" onclick="teizi('+postid+');">\n' +
			'                        <img src='+postimgs[0]+' alt="">\n' +
			'                    </div>\n' +
			'                    <div class="article01_content">\n' +
			'                        <div class="article01_content_title" style="cursor: pointer;"  id="text" onclick="teizi('+postid+');">'+posttext+'</div>\n' +
			'                        <div class="article01_content_info">\n' +
			'                            <div>\n' +
			'                                <span>'+like+'</span>\n' +
			'                                <span>好笑</span>\n' +
			'                                <span>·</span>\n' +
			'                                <span>'+comment+'</span>\n' +
			'                                <span>评论</span>\n' +
			'                            </div>\n' +
			'                            <div class="article01_user">\n' +
			'                                <img onclick="tzuser('+uid+')" style="cursor: pointer;" src='+useravatar+' alt="">\n' +
			'                                <span onclick="tzuser('+uid+')" style="cursor: pointer;">'+uname+'</span>\n' +
			'                            </div>\n' +
			'                        </div>\n' +
			'                    </div>\n' +
			'                </div>'
		}
	
	return div;
}


function teizi(tzid){
	window.location.href="pageinfo.html?postid="+tzid; 
}


//点赞
function dianzan(tzid){
	
	
		$("#bian").css("background-color","red")
		$("#limian").css("background-color","red")
	
	if(getCookie("dz")!=tzid){
		
		mypost(likethis,{"postid":tzid,"token":getCookie("token")},function(data){
			console.log(data)
			
			if (data.code == 200) {
					document.getElementById("like").innerHTML="";
					addCookie("dz",tzid,24);
			}else{
				alert("点赞失败")
			}
			
			mypost(getpostbyid,{"postid":tzid},function(data){
				console.log(data)
				if (data.code == 200) {
			
						$("#like").html(data.data.postinfo.count.like);
				}else{
					console.log("非法调用")
				}
			},"GET")
			
			
		},"POST")
	}else{
		alert("您已经点过赞了")
	}
	
	
}





function showpl(){
	$("#pinglun-kuang").css("display","inline");
}



function fabu(){
	

	var pinglunnr = $("#xpinglun").val();
	var tzid = getCookie("tzid");
	var token = getCookie("token");
	mypost(commentthis,{"postid":tzid,"commenttext":pinglunnr,"token":token},function(data){
		console.log(data)
		if (data.code == 200) {
				
				alert("评论成功")
				
		}else{
			alert("评论失败")
		}
		
		
		$("#xpinglun").val("");
		document.getElementById("pingluncount").innerHTML="";
		document.getElementById("pinglun").innerHTML="";
		mypost(getpostbyid,{"postid":tzid},function(data){
			console.log(data)
			if (data.code == 200) {
					
					$("#pingluncount").html(data.data.postinfo.count.comment);
					data.data.postcomment.forEach(item => {
						$("#pinglun").append(pl(item.userinfo.username,item.userinfo.userid,item.commentid,item.commenttext));	
					})
				
			}else{
				console.log("非法调用")
			}
		},"GET")
	},"POST")
}


//广告
function gg(){
	mypost(getAdv,{"token":getCookie("token")},function(data){
		console.log("广告"+data);
		if(data.data.advinfo==null){
			$("#guanggao").css("display","none");
		}else{
			$("#guanggao").append(gggb());
			data.data.advinfo.forEach(item => {
				$("#guanggao").append(scgg(item.acontext,item.aimg))
			})
		}
		
	},"GET")
}

function gggb(){
	var div = '<div id="gbgg">\n'+
					'	<img onclick="guanbi()" src="https://icons.bootcss.com/assets/icons/x.svg" style="width:30px;float: right;cursor: pointer;">\n'+
					'</div>\n'
					return div;
}

function scgg(acontext,aimg){
	var div = '<div class="qsub-right-advertising" >\n' +
	    '\t\t\t\t\t\t<div id="ggtext" style="font-weight: 700;font-size: 18px;overflow:hidden;white-space:normal;word-break:break-all; text-align:center;">\n' +
	    '\t\t\t\t\t\t\t\ '+acontext+'  n' +
	    '\t\t\t\t\t\t</div>\n' +
	    '\t\t\t\t\t\t<img src='+aimg+'\n' +
	    '\t\t\t\t\t\t alt="" style="margin-bottom:10px;margin-top:10px;">\n' +
	    '\t\t\t\t\t</div>'
		return div;
}

//关闭广告
function guanbi(){
	mypost(getAdv,{"token":getCookie("token")},function(data){
		console.log(data)
		if(data.data.advinfo==null){
			$("#guanggao").css("display","none");
		}else{
			
			alert("请先登陆,才能关闭广告")
		}
	},"GET")
}


function shifoudl(){
	if((getCookie("username")==null || getCookie("username")=="")||(getCookie("useravatar")==null || getCookie("useravatar")=="")||(getCookie("token")==null || getCookie("token")=="")){
		
		$("#denglu-button").css("display","inline");
		$("#dengchu-button").css("display","none");
		$("#userxx").css("display","none");
	}else{
	
		$("#denglu-button").css("display","none");
		$("#dengchu-button").css("display","inline");
		$("#userxx").css("display","inline");
		$("#userxx").append(userjbxx(getCookie("uid"),getCookie("username"),getCookie("useravatar")));
	}
}


//当前用户信息
function userjbxx(uid,username,useravatar){
	var div = '<img src='+useravatar+' onclick="tzzyuser('+uid+');" style="cursor: pointer;width: 40px;height: 40px;border-radius: 60px;vertical-align: middle;margin-right: 10px;" ><span onclick="tzzyuser('+uid+');" style="cursor: pointer;">'+username+'</span>'
		return div;
}

//登陆
function denglu(){
	window.location.href="login.html";
}

//登出
function dengchu(){
	addCookie("username","",24);
	addCookie("useravatar","",24);
	addCookie("token","",24);
	addCookie("uid","",24);
	window.location.href="index.html";
}









function tztuijian(){
	window.location.href="index.html?type=1";
}
function tzshipin(){
	window.location.href="index.html?type=2";
}
function tzretu(){
	window.location.href="index.html?type=3";
}
function tzduanzi(){
	window.location.href="index.html?type=4";
}


function tzuser(uid){
	if(getCookie("token")==null || getCookie("token")==""){
		alert("请登录")
	}else{
		window.location.href="bierenzy.html?userid="+uid;
	}
}

function tzzyuser(uid){
	window.location.href="zy.html?userid="+uid;
}


