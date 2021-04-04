$(function(){
	
	var email = GeturlString("email");
	$("#activeUser").submit(function(){
			
			// console.log($(this).serialize());
			mypost(activateUser,{"email":email,"code":$("#code").val()},function(data){
				if(data.code != 200){
					alert(data.msg);
				}else{
					alert("激活成功");
					window.location.href = 'login.html';
				}
			},"POST")
			return false;
		})	
	
})
function GeturlString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
		if (r != null) return unescape(r[2]);
		return null;
	}