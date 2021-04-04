$(function(){
	
	$("#registUser").submit(function(){
			
			// console.log($(this).serialize());
			mypost(registerUser,$(this).serialize(),function(data){
				if(data.code != 200){
					alert(data.msg);
				}else{
					alert("注册成功请根据邮箱发送的激活码来激活账号");
					window.location.href = "code.html?email="+$("#email").val();
				}
			},"POST")
			
			return false;
		})	
	
	
})

