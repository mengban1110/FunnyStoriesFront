$(function(){
	tj();
	gg();
	canshu(getQueryString("type"));
})

function canshu(type){
	if(type==1){
		tj();
		$("#tj").attr("class","");
		$("#sp").attr("class","");
		$("#rt").attr("class","");
		$("#dz").attr("class","");
		$("#tj").attr("class","pitchon");
	}
	if(type==2){
		ship();
		$("#tj").attr("class","");
		$("#sp").attr("class","");
		$("#rt").attr("class","");
		$("#dz").attr("class","");
		$("#sp").attr("class","pitchon");
	}
	if(type==3){
		ret();
		$("#tj").attr("class","");
		$("#sp").attr("class","");
		$("#rt").attr("class","");
		$("#dz").attr("class","");
		$("#rt").attr("class","pitchon");
	}
	if(type==4){
		duz();
		$("#tj").attr("class","");
		$("#sp").attr("class","");
		$("#rt").attr("class","");
		$("#dz").attr("class","");
		$("#dz").attr("class","pitchon");
	}
}



function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


function tj(){
	document.getElementById("tuijian").innerHTML="";
	mypost(getrecommend,{page:1,size:10},function(data){
		console.log(data)
		if (data.code == 200) {
			
			data.data.postinfo.forEach(item => {
				
				$("#tuijian").append(add(item.userinfo.uname,item.userinfo.useravatar,item.count.like,item.count.comment,item.postid,item.posttext,item.postimg,item.createtime,item.postvideo))
			})
		}else{
			console.log("非法调用")
		}
	},"GET")
}
function add(uname,useravatar,like,comment,postid,posttext,postimg,createtime,postvideo){
	
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
		'                                <img src='+useravatar+' alt="">\n' +
		'                                <span>'+uname+'</span>\n' +
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
			'                        <div class="article01_content_title" style="cursor: pointer;" id="text" onclick="teizi('+postid+');">'+posttext+'</div>\n' +
			'                        <div class="article01_content_info">\n' +
			'                            <div>\n' +
			'                                <span>'+like+'</span>\n' +
			'                                <span>好笑</span>\n' +
			'                                <span>·</span>\n' +
			'                                <span>'+comment+'</span>\n' +
			'                                <span>评论</span>\n' +
			'                            </div>\n' +
			'                            <div class="article01_user">\n' +
			'                                <img src='+useravatar+' alt="">\n' +
			'                                <span>'+uname+'</span>\n' +
			'                            </div>\n' +
			'                        </div>\n' +
			'                    </div>\n' +
			'                </div>'
	}else{
			var div = '<div class="article01">\n' +
			'                    <div class="article01_img" style="cursor: pointer;" onclick="teizi('+postid+');">\n' +
			'                        <img src='+postimg+' alt="">\n' +
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
			'                                <img src='+useravatar+' alt="">\n' +
			'                                <span>'+uname+'</span>\n' +
			'                            </div>\n' +
			'                        </div>\n' +
			'                    </div>\n' +
			'                </div>'
		}
		
	
	
	return div;
}


//推荐专区
function tuij(){
	document.getElementById("tuijian").innerHTML="";
	tj();
}

//视频专区
function ship(){
	document.getElementById("tuijian").innerHTML="";
	mypost(getvideopost,{page:1,size:10},function(data){
		console.log(data)
		if (data.code == 200) {
			
			data.data.postinfo.forEach(item => {
				
				$("#tuijian").append(addsp(item.userinfo.uname,item.userinfo.useravatar,item.count.like,item.count.comment,item.postid,item.posttext,item.postvideo,item.createtime))
			})
		}else{
			console.log("非法调用")
		}
	},"GET")
}



function addsp(uname,useravatar,like,comment,postid,posttext,postvideo,createtime){
	
	var div = '<div class="topic-test">\n' +
    '<div class="topic-test-top"><img class="topic-test-top-img" src='+useravatar+'><span class="topic-test-top-span">'+uname+'</span></div>\n' +
    '	<div class="topic-test-content">\n' +
    '		<div class="topic-test-content-text" style="cursor: pointer;" onclick="teizi('+postid+');">'+posttext+'</div>\n' +
    '			<video id="video" width="100%" controls="controls" autoplay="autoplay" poster="" preload="auto" playsinline="true" webkit-playsinline="true">\n' +
    ' 				<source src='+postvideo+' type="video/mp4"></source>\n' +
    '			</video>\n' +
    '		</div>\n' +
    '			\n' +
    '</div>'+'<div class="topic-test-bottom">\n' +
    '	<div class="topic-test-bottom-left">表白墙</div>\n' +
    '		<div class="topic-test-bottom-img">\n' +
    '			<div class="topic-test-bottom-img-nr" style="fill: rgb(105, 104, 255);"><svg onclick="teizi('+postid+');" t="1616177381475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1147" width="128" height="128"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-977.408C254.976 46.592 46.592 254.976 46.592 512s208.384 465.408 465.408 465.408 465.408-208.384 465.408-465.408c-0.512-257.024-208.384-464.896-465.408-465.408z" fill="#bfbfbf" p-id="1148"></path><path d="M268.8 371.2c0 34.304 27.648 61.952 61.952 61.952 34.304 0 61.952-27.648 61.952-61.952 0-34.304-27.648-61.952-61.952-61.952-34.304-0.512-61.952 27.648-61.952 61.952zM630.784 371.2c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-34.304-27.648-61.952-61.952-61.952s-61.952 27.648-61.952 61.952zM512 841.216c-155.648-2.56-280.576-129.024-281.088-284.672 0-12.8 10.24-23.04 23.04-23.552l258.048-2.56h259.072c12.8 0 23.04 10.24 23.04 23.04 1.536 157.696-124.928 286.72-282.112 287.744z m-233.472-261.12c12.288 120.32 112.64 212.48 233.472 214.528 122.368-1.536 224.256-95.744 235.008-218.112H512l-233.472 3.584z" fill="#bfbfbf" p-id="1149"></path></svg>\n' +
    '				<div>'+like+'</div>\n' +
    '				</div>\n' +
    '			<div class="topic-test-bottom-img-nr"><svg onclick="teizi('+postid+');" t="1616177521435" class="icon" viewBox="0 0 1058 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2664" width="128" height="128"><path d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0" p-id="2665" fill="#cdcdcd"></path></svg>\n' +
    '				<div>'+comment+'</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '</div>'
	
	return div;
}




function xuanzhong(obj){
	$("#tj").attr("class","");
	$("#sp").attr("class","");
	$("#rt").attr("class","");
	$("#dz").attr("class","");
	$(obj).attr("class","pitchon");
}


//热图
function ret(){
	document.getElementById("tuijian").innerHTML="";
	
	mypost(getphotopost,{page:1,size:10},function(data){
		console.log(data)
		if (data.code == 200) {
			
			data.data.postinfo.forEach(item => {
				
				$("#tuijian").append(addrt(item.userinfo.uname,item.userinfo.useravatar,item.count.like,item.count.comment,item.postid,item.posttext,item.postimg,item.createtime))
			})
		}else{
			console.log("非法调用")
		}
	},"GET")
}

function addrt(uname,useravatar,like,comment,postid,posttext,postimg,createtime){
	
	var div = '<div class="topic-test">\n' +
    '                    <div class="topic-test-top"><img class="topic-test-top-img" src='+useravatar+'><span class="topic-test-top-span">'+uname+'</span></div>\n' +
    '                    <div class="topic-test-content">\n' +
    '                        <div class="topic-test-content-text" style="cursor: pointer;" onclick="teizi('+postid+');">'+posttext+'</div><img onclick="teizi('+postid+');"  style="cursor: pointer;" class="topic-test-content-img-1" src='+postimg+' data-preview-group="1616176402934-17-qsub" data-preview-src=""></div>\n' +
    '                    <div class="topic-test-bottom">\n' +                    
    '                        <div class="topic-test-bottom-img">\n' +
    '                            <div class="topic-test-bottom-img-nr" style="fill: rgb(0, 0, 0);"><svg onclick="teizi('+postid+');" t="1616177381475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1147" width="128" height="128"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-977.408C254.976 46.592 46.592 254.976 46.592 512s208.384 465.408 465.408 465.408 465.408-208.384 465.408-465.408c-0.512-257.024-208.384-464.896-465.408-465.408z" fill="#bfbfbf" p-id="1148"></path><path d="M268.8 371.2c0 34.304 27.648 61.952 61.952 61.952 34.304 0 61.952-27.648 61.952-61.952 0-34.304-27.648-61.952-61.952-61.952-34.304-0.512-61.952 27.648-61.952 61.952zM630.784 371.2c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-34.304-27.648-61.952-61.952-61.952s-61.952 27.648-61.952 61.952zM512 841.216c-155.648-2.56-280.576-129.024-281.088-284.672 0-12.8 10.24-23.04 23.04-23.552l258.048-2.56h259.072c12.8 0 23.04 10.24 23.04 23.04 1.536 157.696-124.928 286.72-282.112 287.744z m-233.472-261.12c12.288 120.32 112.64 212.48 233.472 214.528 122.368-1.536 224.256-95.744 235.008-218.112H512l-233.472 3.584z" fill="#bfbfbf" p-id="1149"></path></svg>\n' +
    '                                <div>'+like+'</div>\n' +
    '                            </div>\n' +
    '                            <div class="topic-test-bottom-img-nr"><svg onclick="teizi('+postid+');" t="1616177521435" class="icon" viewBox="0 0 1058 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2664" width="128" height="128"><path d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0" p-id="2665" fill="#cdcdcd"></path></svg>\n' +
    '                                <div>'+comment+'</div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>'

	return div;
}






//段子
function duz(){
	document.getElementById("tuijian").innerHTML="";
	mypost(gettextpost,{page:1,size:10},function(data){
		console.log(data)
		if (data.code == 200) {
			
			data.data.postinfo.forEach(item => {
				
				$("#tuijian").append(adddz(item.userinfo.uname,item.userinfo.useravatar,item.count.like,item.count.comment,item.postid,item.posttext,item.createtime))
			})
		}else{
			console.log("非法调用")
		}
	},"GET")
	
	
}

function adddz(uname,useravatar,like,comment,postid,posttext,createtime){
	
	var div = '<div class="topic-test">\n' +
    '                    <div class="topic-test-top"><img class="topic-test-top-img" src='+useravatar+'><span class="topic-test-top-span">'+uname+'</span></div>\n' +
    '                    <div class="topic-test-content">\n' +
    '                        <div class="topic-test-content-text" style="cursor: pointer;" onclick="teizi('+postid+');">'+posttext+'</div>\n' +
    '                    </div>\n' +
    '                    <div class="topic-test-bottom">\n' +
    '                        <div class="topic-test-bottom-img">\n' +
    '                            <div class="topic-test-bottom-img-nr" style="fill: rgb(0, 0, 0);"><svg onclick="teizi('+postid+');" t="1616177381475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1147" width="128" height="128"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-977.408C254.976 46.592 46.592 254.976 46.592 512s208.384 465.408 465.408 465.408 465.408-208.384 465.408-465.408c-0.512-257.024-208.384-464.896-465.408-465.408z" fill="#bfbfbf" p-id="1148"></path><path d="M268.8 371.2c0 34.304 27.648 61.952 61.952 61.952 34.304 0 61.952-27.648 61.952-61.952 0-34.304-27.648-61.952-61.952-61.952-34.304-0.512-61.952 27.648-61.952 61.952zM630.784 371.2c0 34.304 27.648 61.952 61.952 61.952s61.952-27.648 61.952-61.952c0-34.304-27.648-61.952-61.952-61.952s-61.952 27.648-61.952 61.952zM512 841.216c-155.648-2.56-280.576-129.024-281.088-284.672 0-12.8 10.24-23.04 23.04-23.552l258.048-2.56h259.072c12.8 0 23.04 10.24 23.04 23.04 1.536 157.696-124.928 286.72-282.112 287.744z m-233.472-261.12c12.288 120.32 112.64 212.48 233.472 214.528 122.368-1.536 224.256-95.744 235.008-218.112H512l-233.472 3.584z" fill="#bfbfbf" p-id="1149"></path></svg>\n' +
    '								<div>'+like+'</div>\n'+
    '                            </div>\n' +
    '                            <div class="topic-test-bottom-img-nr"><svg onclick="teizi('+postid+');" t="1616177521435" class="icon" viewBox="0 0 1058 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2664" width="128" height="128"><path d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0" p-id="2665" fill="#cdcdcd"></path></svg>\n' +
    '								<div>'+comment+'</div>\n'+
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>'

	return div;
}


//广告
function gg(){
	mypost(getAdv,{"token":getCookie("token")},function(data){
		console.log(data)
		if(data.data.advinfo==null){
			$("#guanggao").css("display","none");
		}else{
			data.data.advinfo.forEach(item => {
				$("#guanggao").append(scgg(item.acontext,item.aimg))
			})
		}
	},"GET")
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


function teizi(tzid){
	
	window.location.href="pageinfo.html?postid="+tzid; 
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

