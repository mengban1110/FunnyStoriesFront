				$(function(){
					$("#bottom-right1").css("display","inline");
					$("#bottom-right2").css("display","none");
					$("#bottom-right3").css("display","none");
					$("#bottom-right4").css("display","none");
					
					
					
					
					
					
					var username = getCookie("username");
					var useravatar = getCookie("useravatar");
					var token = getCookie("token");
					
					
					$("#username").html(username);
					var img = '<img id="middle-head" src="'+useravatar+'" >';
					$("#middle-head-frame").html(img);
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				})
				
				
				
				layui.use('form', function(){
				  var form = layui.form; 
				  form.render();
				});    
	
			
			function clickafter(obj){
				//清空其它同类按钮选中颜色
				        $('.down-button-zy').css("border-bottom", "0px");//按钮原来颜色
						 $('.down-button-qs').css("border-bottom", "0px");//按钮原来颜色
						  $('.down-button-pl').css("border-bottom", "0px");//按钮原来颜色
						   $('.down-button-grxx').css("border-bottom", "0px");//按钮原来颜色
				        //点击后变色
					
				        $(obj).css("border-bottom", "5px solid saddlebrown");
						if($(obj).text()=="主页"){
						
							$("#bottom-right1").css("display","inline");
							$("#bottom-right2").css("display","none");
							$("#bottom-right3").css("display","none");
							$("#bottom-right4").css("display","none");
						}
						if($(obj).text()=="糗事"){
					
							$("#bottom-right1").css("display","none");
							$("#bottom-right2").css("display","inline");
							$("#bottom-right3").css("display","none");
							$("#bottom-right4").css("display","none");
						}
						if($(obj).text()=="评论"){
						
							$("#bottom-right1").css("display","none");
							$("#bottom-right2").css("display","none");
							$("#bottom-right3").css("display","inline");
							$("#bottom-right4").css("display","none");
						}
						if($(obj).text()=="个人信息"){
						
							$("#bottom-right1").css("display","none");
							$("#bottom-right2").css("display","none");
							$("#bottom-right3").css("display","none");
							$("#bottom-right4").css("display","inline");
						}
			}
			
			
			
			
