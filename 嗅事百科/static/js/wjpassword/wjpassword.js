$(function(){
	
	$("#wjPWD").click(function(){
			mypost(recallemail, {"email":$("#email").val(),"token":getCookie("token")}, function(data){
				if(data.code != 200){
					alert(data.msg);
				}else{
					alert("已发送邮件请根据激活码来修改密码")
					window.location.href = "code2.html";
				}
			},"POST")
		})	
})