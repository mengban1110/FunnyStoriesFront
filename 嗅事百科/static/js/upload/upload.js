layui.use('upload', function(){
  var $ = layui.jquery
  ,upload = layui.upload;
  var files;
  var demoListView = $('#demoList')
  upload.render({
    elem: '#test5'
    ,url: 'http://localhost:8080/FunnyStories/api/post/userpost' //改成您自己的上传接口
    ,accept: 'video'//视频
	,auto: false
	,data:{"text":$("#textContent").val(),"token":getCookie("token")}
	,bindAction: '#btnupload'
    ,done: function(res){
		console.log(res);
      layer.msg('上传成功');
	  alert("上传成功")
      console.log(res)
    },
	choose: function(obj){   
      files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
      //读取本地文件
      obj.preview(function(index, file, result){
        var tr = $(['<tr id="upload-'+ index +'">'
          ,'<td>'+ file.name +'</td>'
          ,'<td>'+ (file.size/1024).toFixed(1) +'kb</td>'
          ,'<td>'
            ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
            ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
          ,'</td>'
        ,'</tr>'].join(''));
        
        //单个重传
        tr.find('.demo-reload').on('click', function(){
          obj.upload(index, file);
        });
        
        //删除
        tr.find('.demo-delete').on('click', function(){
          delete files[index]; //删除对应的文件
          tr.remove();
          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
        });
        
        demoListView.append(tr);
      });
    }
  });
  
  
  //多文件列表示例
 //  var demoListView = $('#demoList')
 //  ,uploadListIns = upload.render({
 //    elem: '#testList'
 //    ,url: 'http://localhost:8080/FunnyStories/api/post/userpost' //改成您自己的上传接口
 //    ,accept: 'images'
 //    ,multiple: true
	// ,data:{"text":$("#textContent").val(),"token":getCookie("token")}
 //    ,auto: false
 //    ,bindAction: '#btnupload'
 //    ,choose: function(obj){   
 //      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
 //      //读取本地文件
 //      obj.preview(function(index, file, result){
 //        var tr = $(['<tr id="upload-'+ index +'">'
 //          ,'<td>'+ file.name +'</td>'
 //          ,'<td>'+ (file.size/1024).toFixed(1) +'kb</td>'
 //          ,'<td>等待上传</td>'
 //          ,'<td>'
 //            ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
 //            ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
 //          ,'</td>'
 //        ,'</tr>'].join(''));
        
 //        //单个重传
 //        tr.find('.demo-reload').on('click', function(){
 //          obj.upload(index, file);
 //        });
        
 //        //删除
 //        tr.find('.demo-delete').on('click', function(){
 //          delete files[index]; //删除对应的文件
 //          tr.remove();
 //          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
 //        });
        
 //        demoListView.append(tr);
 //      });
 //    }
 //    ,done: function(res, index, upload){
	// 	console.log(res);
 //      if(res.code == 200){ //上传成功
 //        var tr = demoListView.find('tr#upload-'+ index)
 //        ,tds = tr.children();
 //        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
 //        tds.eq(3).html(''); //清空操作
 //        return delete this.files[index]; //删除文件队列已经上传成功的文件
 //      }
 //      this.error(index, upload);
 //    }
 //    ,error: function(index, upload){
	// 	console.log(index)
	// 	console.log(upload)
 //      var tr = demoListView.find('tr#upload-'+ index)
 //      ,tds = tr.children();
 //      tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
 //      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
 //    }
 //  });
  

		layui.use('upload', function () {
		    var $ = layui.jquery
		        , upload = layui.upload;
		    //多文件列表示例
		    var demoListView = $('#demoList')
		        , uploadListIns = upload.render({
		        elem: '#testList'
		        , accept: 'imgs'
		        , multiple: true
		        , auto: false
		        , bindAction: '#btnupload'
		        , choose: function (obj) {
		            files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
		            //读取本地文件
		            obj.preview(function (index, file, result) {
		                var tr = $(['<tr id="upload-' + index + '">'
		                    , '<td>' + file.name + '</td>'
		                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
		                    , '<td>'
		                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
		                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
		                    , '</td>'
		                    , '</tr>'].join(''));
		
		                //单个重传
		                tr.find('.demo-reload').on('click', function () {
		                    obj.upload(index, file);
		                });
		
		                //删除
		                tr.find('.demo-delete').on('click', function () {
		                    delete files[index]; //删除对应的文件
		                    tr.remove();
		                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
		                });
		
		                demoListView.append(tr);
		            });
		        }
		    });
		});
		
		
		$("#btnupload").on("click", function () {
		    var form = new FormData();
		    for (let i in files) {
		        form.append("files", files[i]);
		    }
		    form.append("token", getCookie("token"));
			form.append("text",  $("#Contenttext").val())
		    // form.append("tm",new Date().getTime());
		    var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
		    $.ajax({
		        url: 'http://localhost:8080/FunnyStories/api/post/userpost',
		        type: "post",
		        dataType: "json",
		        async: false,
		        contentType: false,
		        processData: false,
		        data: form,
		        success: function (result) {
		            if (result.code == 200) {
						alert("发帖成功等待审核");
						window.location.href = "index.html";
		            } else {
		                // layer.msg(result.msg, {icon: 5});
						alert("发帖失败请重试")
						window.location.href = "index.html";
		            }
		        }
		    })
		});
  
});
