var domain = "http://123.57.42.178:8089/FunnyStories" //项目domin

//2.主页数据
//1 : 注册
var registerUser = "/api/user/register";
//2 : 激活
var activateUser = "/api/user/activate";
//3 : 登录
var loginUser = "/api/user/login";
//4 : 修改密码
var changeUserPassword = "/api/user/changepassword";
//5 : 找回密码(发送邮件)
var recallemail = "/api/user/recallemail";
//6 : 找回密码(修改密码)
var reCell = "/api/user/recall";
//7.1 : 推荐版块
var getrecommend = "/api/post/getrecommend";
//7.2 : 视频版块
var getVidePost = "/api/post/getvideopost";
//7.3 : 图文版块
var getPhotoPost = "/api/post/getphotopost";
//7.4 : 文本版块
var getTextPost = "/api/post/gettextpost";
//8 : 获取指定帖子数据(内有评论)
var getPostById = "/api/post/getpostbyid";
//9 : 获取相关推荐(其实7.1一样 只不过注意点不同)
var getRealtive = "/api/post/getrelative";
//10 : 点赞指定帖子
var likeThisPost = "/api/post/likethis";
//11 : 评论指定帖子
var commentThisPost = "/api/post/commentthis";
//12 : 获取指定用户数据(个人主页)
var lookUser = "/api/user/lookuser";
//13 : 获取用户数据
var getUserInfo = "/api/user/getuserinfo";
//14 : 修改用户数据
var changeUserInfo = "/api/user/changeinfo";
//15 : 获取广告数据
var getAdv = "/api/adv/getadv";
//16 : 发帖
var userPost = "/api/post/userpost";
//17 : 获取推荐板块
var getrecommend = "/api/post/getrecommend";
//18 ：获取视频板块
var getvideopost = "/api/post/getvideopost";
//19 : 获取热图板块
var getphotopost ="/api/post/getphotopost";
//20 : 获取段子板块
var gettextpost = "/api/post/gettextpost";

//21 : 获取指定帖子数据
var getpostbyid = "/api/post/getpostbyid";
//22 : 点赞指定帖子
var likethis = "/api/post/likethis";
//23 : 评论指定帖子、
var commentthis = "/api/post/commentthis";






/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function mypost(api, parameters, callback,type) {
	console.log(api)
    console.log("-------------------------")
    console.log("请求地址 : " + domain + api)
    $.ajax({
        url: domain + api,
        data: parameters,
        type: type,
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: false, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}


/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function myget(api, parameters, callback) {
    console.log("-------------------------")
    console.log("请求地址 : " + domain + api)
    $.ajax({
        url: domain + api,
        data: parameters,
        type: 'GET',
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: true, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}
/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function mypost1(api, parameters, callback) {
    console.log("-------------------------")
    console.log("请求地址 : " + domain + api)
    $.ajax({
        url: domain + api,
        data: parameters,
        type: 'POST',
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: true, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}



/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function mypost2(api, parameters, callback) {
    console.log("-------------------------")
    console.log("请求地址 : " + domain2 + api)
    $.ajax({
        url: domain2 + api,
        data: parameters,
        type: 'POST',
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: true, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}


/**
 * 获取Param参数
 * 
 * @param {Object} name
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}