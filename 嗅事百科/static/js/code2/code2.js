$(function(){
	
	$("#editPWD").submit(function(){
		
		mypost(reCell,$(this).serialize(),function(data){
			if(data.code != 200){
				alert(data.msg);
			}else{
				console.log("修改成功");
				window.location.href = 'login.html';
			}
		},"POST")
		
		return false;
	})
})