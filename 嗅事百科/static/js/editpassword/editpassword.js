$(function(){
	$("#eiditPwd").submit(function(){
			
			mypost(changeUserPassword, {"email":$("#email").val(),"newpassword":$("#newpassword").val(),"token":getCookie("token")}, function(data){
				
				if(data.code != 200){
					alert(data.msg);
				}else{
					alert("修改成功");
					window.location.href = "login.html";
				}
			},"POST")
			return false;
		})	
})