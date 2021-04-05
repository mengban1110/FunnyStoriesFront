$(function(){
	
	
	
	$("#UserLogin").submit(function(){
			
			// console.log($(this).serialize());
			mypost(loginUser,$(this).serialize(),function(data){
				if(data.code != 200){
					alert(data.msg);
				}else{
					console.log("登录成功");
					console.log(data);
					addCookie("username",data.username,24);
					addCookie("useravatar",data.useravatar,24);
					addCookie("token",data.token,24);
					addCookie("uid",data.uid,24);
					window.location.href = 'zy.html';
				}
			},"POST")
			return false;
		})	
})