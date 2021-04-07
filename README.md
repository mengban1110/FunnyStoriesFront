# 更新日志

- 2021年4月1日20:23:57
  - 修改13:获取用户数据的api url地址



------



# 0 : 注意事项

## 0.1 : 命名规范

Json中的key一律小写

## 0.2 : Json格式

```json
{
    "code": "200",       //状态码
    "msg": "请求成功",    //信息
    "data": {           //数据
        "username": "梦伴",
        "token": "awwerhsdvgsrhsdbhrwsdb51asffghjt"
    }
}
```

## 0.3 : 通用状态码描述

- 错误返回的负数，正确返回是正数
- 以下为通用情况下 返回的状态码 其他情况详情见api

| code | 解释               |
| ---- | ------------------ |
| 500  | 服务器内部错误     |
| 200  | 请求成功           |
| -1   | 未登录             |
| -2   | 非法调用(参数错误) |
| -404 | **请求方式**错误   |

## 0.4 : 注意事项

- 本次开发的方向是论坛方向 可为以后增加相关项目经验
- 写完一个api 就自行postman测试 不要出现 本末倒置的情况
- 在后端管理系统中  管理员进行的 `增删改` 操作 都要向log表中写入!

- 因为是后台管理系统 所以只有登录 不开放注册

## 0.5 : 友情提示

> 如果不了解执行流程或者某些状态码
>
> 如果文档有误或者看不懂 
>
> 私聊问我 别自己琢磨导致耽误时间



> 本次是短期开发 3月20日要出第一版 所以大家珍惜时间 
>
> 难度不大 就是重复写sql  开头进度会比较慢 
>
> 但是后前中期的时候 代码格式基本cv 重复写sql罢了
>
> 
>
> 请每天按时学习上课内容,不要因为写项目 耽误课上内容,
>
> 所以我们每天都尽量少摸鱼, 只要顶过这次 也就解放了,也是对各位以后工作抗压能力的提升
>
> 以后再写东西就是框架了 快速开发 比现在会轻松很多
>
> 
>
> 每天我会询问大家学习情况,项目进度,做出适当调整



------

# 1 : 注册

**注意点**

1. 校验传参(注意校验顺序)
2. 需要在后台校验 昵称(唯一的不能重复) 邮箱(唯一的不能重复) 密码(校验密码规律)
3. 点击注册之后要生成验证码到code表中  有效期5分钟

**URL**

```ini
/api/user/register
```

**请求方式**

```ini
Post
```

**请求参数**

| 参数名   | 示例             | 解释 |
| -------- | ---------------- | ---- |
| username | sadasasd         | 昵称 |
| password | yangsadas11121.. | 密码 |
| email    | 26622525@qq.com  | 邮箱 |

**响应示例**

```json
{
    "msg": "邮件发送成功",
    "code": "200",
}
```

**错误示例**

```json
{
	"code":"-3",
	"msg":"昵称已被注册"
}

{
	"code":"-4",
	"msg":"邮箱昵称已被注册"
}
```



------

# 2 : 激活

**注意点**

1. 先判断有没有验证码,没有返回 激活码错误
2. 再判断激活码是否失效
3. 如果有激活码 判断邮箱对应的激活码是否正确
4. 激活成功要在用户表中改变用户状态 详情见数据库.md

**URL**

```ini
/api/user/activate
```

**请求方式**

```ini
Post
```

**请求参数**

| 参数名 | 示例            | 解释   |
| ------ | --------------- | ------ |
| email  | 26622525@qq.com | 邮箱   |
| code   | 123A            | 激活码 |

**响应示例**

```json
{
    "msg": "激活成功",
    "code": "200",
}
```

**错误示例**

```json
{
	"code":"-3",
	"msg":"激活码失效"
}

{
	"code":"-4",
	"msg":"激活码错误"
}

```



------

# 3 : 登录

**注意点**

1. 校验传参(注意校验顺序)
2. 需要在后台校验 用户名 密码
3. 登录成功后 需要刷新token
4. 登录成功后 需要在userlogin表中添加对应数据

**URL**

```ini
/api/user/login

```

**请求方式**

```ini
Post

```

**请求参数**

| 参数名   | 示例             | 解释 |
| -------- | ---------------- | ---- |
| username | sadasasd         | 昵称 |
| password | yangsadas11121.. | 密码 |

**响应示例**

```json
{
    "msg": "登陆成功",
    "code": "200",
    "data": {
        "username": "admin",
        "useravatar": "http://file.qsub.cn/1c2754f66b564f1e9ae4afa8b8af00751610432824273.jpg",
        "token": "de7d224fedffeefc8751a53b55d453fc"
    }
}

```

**错误示例**

```json
{
	"code":"-3",
	"msg":"请输入正确的账号"
}

{
	"code":"-4",
	"msg":"请输入正确的密码"
}

{
	"code":"-5",
	"msg":"此用户已被封禁/此用户未激活...先请见数据库.md"
}

```

# 4 : 修改密码

**注意点**

1. 修改成功之后要 刷新一下用户token

**URL**

```ini
/api/user/changepassword

```

**请求方式**

```ini
Post

```

**请求参数**

| 参数名      | 示例              | 解释        |
| ----------- | ----------------- | ----------- |
| email       | 2662252561@qq.com | 邮箱        |
| newpassword | 3211121           | newpassword |
| token       | 12531tsadgsg      | token       |

**响应示例**

```json
{
    "msg": "修改成功",
    "code": "200",
}

```

**错误示例**

```json
{
	"code":"-3",
	"msg":"请勿与原密码相同"
}

{
	"code":"-4",
	"msg":"密码过于简单"
}

```

# 5 : 找回密码(发送邮件)

**注意点**

1. 发送邮件
2. 记得要在code表中加入对应数据  code有效期5分钟

**URL**

```ini
/api/user/recallemail

```

**请求方式**

```ini
Post

```

**请求参数**

| 参数名 | 示例            | 解释  |
| ------ | --------------- | ----- |
| email  | 26245352@qq.com | email |

**响应示例**

```json
{
    "msg": "邮件发送成功",
    "code": "200",
}

```

**错误示例**

```json
{
	"code":"-3",
	"msg":"没有此邮箱"
}

```

# 6 : 找回密码(修改密码)

**注意点**

1. 修改成功 刷新此用户token

**URL**

```ini
/api/user/recall

```

**请求方式**

```ini
Post

```

**请求参数**

| 参数名      | 示例            | 解释        |
| ----------- | --------------- | ----------- |
| email       | 26245352@qq.com | email       |
| newpassword | 213131          | newpassword |
| code        | 12Ad            | code        |

**响应示例**

```json
{
    "msg": "修改成功",
    "code": "200",
}

```

**错误示例**

```json
{
	"code":"-3",
	"msg":"请勿与原密码相同"
}

{
	"code":"-4",
	"msg":"密码过于简单"
}
{
	"code":"-5",
	"msg":"没有此邮箱"
}

```



# 7 : 获取对应板块帖子

## 7.1 : 推荐版块

**注意点**

1. 校验传参(注意校验顺序)

**URL**

```ini
/api/post/getrecommend

```

**请求方式**

```ini
Get

```

**请求参数**

| 参数名 | 示例 | 解释                          |
| ------ | ---- | ----------------------------- |
| page   | 1    | 页数(如果为空 默认为1)        |
| size   | 10   | 每页的数量(如果为空 默认为10) |

**响应示例**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "postinfo": [
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count":{
                    "like":25,//点赞数
                    "comment":25//评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值  如果为空请返回 "暂无文本"

                //如果是视频帖子/纯文本帖子 首页图是默认图  : https://static.qiushibaike.com/images/web/v4/textDefault.png?v=12eaf94cfd4d3ae0423a3925bb5bbf9c
                //如果是图文帖子 首页图则取用第一个图片
                "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                "createtime": "2020-12-26 17:15:53" //时间
            },
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count":{
                    "like":25,//点赞数
                    "comment":25//评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值

                //如果是视频帖子/纯文本帖子 首页图是默认图  : https://static.qiushibaike.com/images/web/v4/textDefault.png?v=12eaf94cfd4d3ae0423a3925bb5bbf9c
                //如果是图文帖子 首页图则取用第一个图片
                "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                "createtime": "2020-12-26 17:15:53" //时间
            },
            
        ]
    }
}

```

**错误示例**

```json
{
	"code":"-2",
	"msg":"非法调用"
}

```

## 7.2 : 视频版块

**注意点**

1. 校验传参(注意校验顺序)
2. 获取的帖子信息不包括已推荐的帖子!

**URL**

```ini
/api/post/getvideopost

```

**请求方式**

```ini
Get

```

**请求参数**

| 参数名 | 示例 | 解释                          |
| ------ | ---- | ----------------------------- |
| page   | 1    | 页数(如果为空 默认为1)        |
| size   | 10   | 每页的数量(如果为空 默认为10) |

**响应示例**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "postinfo": [
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count":{
                    "like":25,//点赞数
                    "comment":25//评论数
                },
                "postid": 1, //帖子ID

                //帖子文本
                "posttext": "梦伴发送的第一条数字", // 文本数值
                "postvideo": "http://file.qsub.cn/%E8%BF%85%E9%9B%B7%E5%BD%B1%E9%9F%B3%202020-12-05%2012-56-57.mp4", // 视频

                "createtime": "2020-12-26 17:15:53" //时间
            },
           {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count":{
                    "like":25,//点赞数
                    "comment":25//评论数
                },
                "postid": 1, //帖子ID

                //帖子文本
                "posttext": "梦伴发送的第一条数字", // 文本数值
                "postvideo": "http://file.qsub.cn/%E8%BF%85%E9%9B%B7%E5%BD%B1%E9%9F%B3%202020-12-05%2012-56-57.mp4", // 视频
                
                "createtime": "2020-12-26 17:15:53" //时间
            },
            
        ]
    }
}


```

**错误示例**

```json
{
	"code":"-2",
	"msg":"非法调用"
}

```

## 7.3 : 图文版块

**注意点**

1. 校验传参(注意校验顺序)
2. 获取的帖子信息不包括已推荐的帖子!

**URL**

```ini
/api/post/getphotopost

```

**请求方式**

```ini
Get

```

**请求参数**

| 参数名 | 示例 | 解释                          |
| ------ | ---- | ----------------------------- |
| page   | 1    | 页数(如果为空 默认为1)        |
| size   | 10   | 每页的数量(如果为空 默认为10) |

**响应示例**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "postinfo": [
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count": {
                    "like": 25, //点赞数
                    "comment": 25 //评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值
                //注意这里是数组的形式给前端 
                "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                "createtime": "2020-12-26 17:15:53" //时间
            },
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count": {
                    "like": 25, //点赞数
                    "comment": 25 //评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值
                //注意这里是数组的形式给前端 
                "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                "createtime": "2020-12-26 17:15:53" //时间
            },
        ]
    }
}

```

**错误示例**

```json
{
	"code":"-2",
	"msg":"非法调用"
}

```

## 7.4 : 文本版块

**注意点**

1. 校验传参(注意校验顺序)
2. 获取的帖子信息不包括已推荐的帖子!

**URL**

```ini
/api/post/gettextpost

```

**请求方式**

```ini
Get

```

**请求参数**

| 参数名 | 示例 | 解释                          |
| ------ | ---- | ----------------------------- |
| page   | 1    | 页数(如果为空 默认为1)        |
| size   | 10   | 每页的数量(如果为空 默认为10) |

**响应示例**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "postinfo": [
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count": {
                    "like": 25, //点赞数
                    "comment": 25 //评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值
                //注意这里是数组的形式给前端 
            
                "createtime": "2020-12-26 17:15:53" //时间
            },
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count": {
                    "like": 25, //点赞数
                    "comment": 25 //评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值
                //注意这里是数组的形式给前端 
            
                "createtime": "2020-12-26 17:15:53" //时间
            },
        ]
    }
}

```

**错误示例**

```json
{
	"code":"-2",
	"msg":"非法调用"
}

```



# 8 : 获取指定帖子数据(内有评论)

**注意点**

1. 需要在bhistory表中添加对应数据
2. token(可有可无,不是必传参数 是因为如果有这个参数 说明是登录状态 然后方便在bhistory中添加数据)

**URL**

```ini
/api/post/getpostbyid

```

**请求方式**

```ini
Get

```

**请求参数**

| 参数名 | 示例       | 解释                         |
| ------ | ---------- | ---------------------------- |
| postid | 21         | 帖子id                       |
| token  | 5125151qdq | token(可有可无,不是必传参数) |

**响应示例**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "postinfo": {
            "userinfo": {
                "uname": "梦伴", //发帖人姓名
                "uid": "1", //发帖人id
                "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix", // 用户头像
                "postcount":"123",//发帖人发帖数量
                "postlikecount":"12321",//发帖人所有帖子被点赞的数量
            },
            "count": {
                "like": 25, //点赞数
                "comment": 25 //评论数
            },
            "postid": 1, //帖子ID
            "posttext": "梦伴发送的第一条数字", // 文本数值
            //如果是视频帖子就没有postimg这列,如果是图文帖子就没有postvideo这列,如果是文本帖子帖子就没有postimg和postvideo
            "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", // 文本数值
            "postvideo": "http://file.qsub.cn/%E8%BF%85%E9%9B%B7%E5%BD%B1%E9%9F%B3%202020-12-05%2012-56-57.mp4",
            "createtime": "2020-12-26 17:15:53" //时间
        },
        "postcomment": [
            {
                "userinfo": {
                    "username": "旅人在此", // 评论人名字
                    "userid" : 1//评论人id
                },
                "commentid": 1, //评论id
                "commenttext": "不错", //评论内容
            },
            {
                "userinfo": {
                    "username": "旅人在此", // 评论人名字
                },
                "commentid": 1, //评论id
                "commenttext": "不错", //评论内容
            }
        ]
    }
}

```

# 9 : 获取相关推荐(其实7.1一样 只不过注意点不同)

**注意点**

1. 表面相关推荐罢了
2. 以时间倒叙的形式获取30个帖子 然后随机抽出来5个

**URL**

```ini
/api/post/getrelative

```

**请求方式**

```ini
Get

```

**请求参数**

```ini
本api不需要参数

```

**响应示例**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "postinfo": [
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count":{
                    "like":25,//点赞数
                    "comment":25//评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值  如果为空请返回 "暂无文本"

                //如果是视频帖子/纯文本帖子 首页图是默认图  : https://static.qiushibaike.com/images/web/v4/textDefault.png?v=12eaf94cfd4d3ae0423a3925bb5bbf9c
                //如果是图文帖子 首页图则取用第一个图片
                "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                "createtime": "2020-12-26 17:15:53" //时间
            },
            {
                "userinfo": {
                    "uname": "梦伴", //发帖人姓名
                    "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix" // 用户头像
                },
                "count":{
                    "like":25,//点赞数
                    "comment":25//评论数
                },
                "postid": 1, //帖子ID
                "posttext": "梦伴发送的第一条数字", // 文本数值

                //如果是视频帖子/纯文本帖子 首页图是默认图  : https://static.qiushibaike.com/images/web/v4/textDefault.png?v=12eaf94cfd4d3ae0423a3925bb5bbf9c
                //如果是图文帖子 首页图则取用第一个图片
                "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                "createtime": "2020-12-26 17:15:53" //时间
            },
            
        ]
    }
}

```

# 10 : 点赞指定帖子

**注意点**

1. 只有登录了才能执行此操作
2. 校验传参(注意校验顺序)

**URL**

```ini
/api/post/likethis

```

**请求方式**

```ini
post

```

**请求参数**

| 参数名 | 示例   | 解释   |
| ------ | ------ | ------ |
| postid | 1      | postid |
| token  | 123132 | token  |

**响应示例**

```json
{
    "code": 200,
    "msg": "点赞成功",
}

```

**错误示例**

```json
{
	"code":"-1",
	"msg":"未登录"
}

{
	"code":"-2",
	"msg":"非法调用"
}

```

# 11 : 评论指定帖子

**注意点**

1. 只有登录了才能执行此操作
2. 校验传参(注意校验顺序)

**URL**

```ini
/api/post/commentthis

```

**请求方式**

```ini
post

```

**请求参数**

| 参数名      | 示例       | 解释     |
| ----------- | ---------- | -------- |
| postid      | 1          | postid   |
| commenttext | 给爷整笑了 | 评论内容 |
| token       | 123132     | token    |

**响应示例**

```json
{
    "code": 200,
    "msg": "评论成功",
}

```

**错误示例**

```json
{
	"code":"-1",
	"msg":"未登录"
}

{
	"code":"-2",
	"msg":"非法调用"
}

```

# 12 : 获取指定用户数据(个人主页)

**注意点**

1. 只有登录了才能执行此操作
2. 校验传参(注意校验顺序)

**URL**

```ini
/api/user/lookuser

```

**请求方式**

```ini
get

```

**请求参数**

| 参数名 | 示例   | 解释   |
| ------ | ------ | ------ |
| userid | 1      | userid |
| token  | 123132 | token  |

**响应示例**

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "postinfo": {
            "userinfo": {
                "uname": "梦伴", //用户姓名
                "uid": "1", //用户id
                "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix", // 用户头像
                "usersex": "男",
                "usersign": "哈哈",
                "userbirth": "2000-11-10",
            },
            "count": {
                "postcount": "123", //用户发帖数量
                "postlikecount": "12321", //用户所有帖子被点赞的数量
                "commentcount": "12312", //用户评论数量
            },
            "history": [ //此用户浏览了什么  
                {
                    "postid": "1", //帖子id
                    "posttext": "梦伴发送的第一条数字", // 文本数值 后端全获取  前端人员做的时候 用多少个字 根据你的div样式决定
                    //如果是视频帖子/纯文本帖子 首页图是默认图  : https://static.qiushibaike.com/images/web/v4/textDefault.png?v=12eaf94cfd4d3ae0423a3925bb5bbf9c
                    //如果是图文帖子 首页图则取用第一个图片
                    "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                    "createtime": "2020-12-26 17:15:53" //时间
                },
                {
                    "postid": "1", //帖子id
                    "posttext": "梦伴发送的第一条数字", // 文本数值 后端全获取  前端人员做的时候 用多少个字 根据你的div样式决定
                    //如果是视频帖子/纯文本帖子 首页图是默认图  : https://static.qiushibaike.com/images/web/v4/textDefault.png?v=12eaf94cfd4d3ae0423a3925bb5bbf9c
                    //如果是图文帖子 首页图则取用第一个图片
                    "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", //图片**URL**
                    "createtime": "2020-12-26 17:15:53" //时间
                },
            ],
            "post": [//此用户发了什么帖
                {
                    "count": {
                        "like": 25, //点赞数
                        "comment": 25 //评论数
                    },
                    "postid": 1, //帖子ID
                    "posttext": "梦伴发送的第一条数字", // 文本数值
                    //如果是视频帖子就没有postimg这列,如果是图文帖子就没有postvideo这列,如果是文本帖子帖子就没有postimg和postvideo
                    "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", // 文本数值
                    "postvideo": "http://file.qsub.cn/%E8%BF%85%E9%9B%B7%E5%BD%B1%E9%9F%B3%202020-12-05%2012-56-57.mp4",
                    "createtime": "2020-12-26 17:15:53" //时间}
                },
                {
                    "count": {
                        "like": 25, //点赞数
                        "comment": 25 //评论数
                    },
                    "postid": 1, //帖子ID
                    "posttext": "梦伴发送的第一条数字", // 文本数值
                    //如果是视频帖子就没有postimg这列,如果是图文帖子就没有postvideo这列,如果是文本帖子帖子就没有postimg和postvideo
                    "postimg": "[http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,http://file.qsub.cn/082cfad61e9a4461a93d786c9a248c111608481610394.jpg,]", // 文本数值
                    "postvideo": "http://file.qsub.cn/%E8%BF%85%E9%9B%B7%E5%BD%B1%E9%9F%B3%202020-12-05%2012-56-57.mp4",
                    "createtime": "2020-12-26 17:15:53" //时间}
                },
            ],
            "postcomment": [//此用户评论了什么
                {
                    "userinfo": {
                        "username": "旅人在此", // 评论人名字
                        "userid": 1 //评论人id
                        "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix", // 用户头像
                    },
                    "postid":"1",//被评论的帖子id
                    "commentid": 1, //评论id
                    "commenttext": "不错", //评论内容
                },
                {
                    "userinfo": {
                        "username": "旅人在此", // 评论人名字
                        "userid": 1 //评论人id
                        "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix", // 用户头像
                    },
                    "postid":"1",//被评论的帖子id
                    "commentid": 1, //评论id
                    "commenttext": "不错", //评论内容
                },
            ]
        }
    }

```

**错误示例**

```json
{
	"code":"-1",
	"msg":"未登录"
}

{
	"code":"-2",
	"msg":"非法调用"
}

```

# 13 : 获取用户数据

**注意点**

1. 只有登录了才能执行此操作
2. 校验传参(注意校验顺序)

**URL**

```ini
/api/user/getuserinfo

```

**请求方式**

```ini
post

```

**请求参数**

| 参数名 | 示例            | 解释   |
| ------ | --------------- | ------ |
| uid    | 1               | userid |
| token  | 1561551251qwewq | token  |

**响应示例**

```json
{
    "code": 200,
    "msg": "修改成功",
    "data":{
         "uname": "梦伴", //用户姓名
                "uid": "1", //用户id
                "useravatar": "http://file.qsub.cn/1b6ec965bf8a4bfda4b1039d000afb691608464547357.prifix", // 用户头像
                "usersex": "男",
                "usersign": "哈哈",
                "userbirth": "2000-11-10",
    }
}

```

**错误示例**

```json
{
	"code":"-1",
	"msg":"未登录"
}

{
	"code":"-2",
	"msg":"非法调用"
}

{
	"code":"-3",
	"msg":"修改失败" 这里的修改失败 返回的msg自己根据情况定义
}

```



# 14 : 修改用户数据

**注意点**

1. 只有登录了才能执行此操作
2. 本api请求体格式为 表单形式
3. 校验传参(注意校验顺序)
4. 见下表(**请求参数**) uid下面的所有参数 如果传输为空 则保持原数据 不进行更改

**URL**

```ini
/api/user/changeinfo

```

**请求方式**

```ini
post

```

**请求参数**

| 参数名     | 示例            | 解释       |
| ---------- | --------------- | ---------- |
| uid        | 1               | userid     |
| username   | 123132          | username   |
| useravatar | file类型的      | useravatar |
| usersex    | 男/女           | usersex    |
| userbirth  | 2000-11-10      | userbirth  |
| usersign   | 哈哈            | usersign   |
| token      | 1561551251wqeqw | token      |



```json
{
    "code": 200,
    "msg": "修改成功",
}

```

**错误示例**

```json
{
	"code":"-1",
	"msg":"未登录"
}

{
	"code":"-2",
	"msg":"非法调用"
}

{
	"code":"-3",
	"msg":"修改失败" 这里的修改失败 返回的msg自己根据情况定义
}

```

# 15 : 获取广告数据

**注意点**

1. token(可有可无,不是必传是为了 判断是否登录)
2. 传token参数 如果验证成功 后端返回直接空了

**URL**

```ini
/api/adv/getadv

```

**请求方式**

```ini
get

```

**请求参数**

| 参数名 | 示例            | 解释                     |
| ------ | --------------- | ------------------------ |
| token  | 1561551251wqeqw | token(可有可无,不是必传) |

**正确示例**

```json
//token验证失败的 也就是未登录的
{
    "code": 200,
    "msg": "获取成功",
    "data":{
        "advinfo":[
            {
                "acontext":"高粱饴真好吃",
                "aimg":"https://img11.360buyimg.com/n1/jfs/t1/119408/4/9851/574588/5efb388dE49571229/515fbc6ddaade1d1.jpg"
            },
            {
                "acontext":"高粱饴真好吃",
                "aimg":"https://img11.360buyimg.com/n1/jfs/t1/119408/4/9851/574588/5efb388dE49571229/515fbc6ddaade1d1.jpg"
            },
            
        ]
    }
}

//token验证失败的 也就是登录成功的
    "code": 200,
    "msg": "获取成功"
}

```

**错误示例**

```json
这还能有错误示例🐴 建议life remake

```

# 16 : 发帖

**注意点**

1. 此api使用表单形式
2. imgs和video不能同时存在

**URL**

```ini
/api/post/userpost

```

**请求方式**

```ini
post

```

**请求参数**

| 参数名 | 示例            | 解释                         |
| ------ | --------------- | ---------------------------- |
| token  | 1561551251wqeqw | token                        |
| text   | 高粱饴真好吃    | 帖子文本 (可有可无,不是必传) |
| imgs   | file            | 最多九张                     |
| videos | file            | 最多一个                     |

**正确示例**

```json
//token验证失败的 也就是未登录的
{
    "code": 200,
    "msg": "发送成功",
}

```

**错误示例**

```json
{
	"code":"-1",
	"msg":"未登录"
}

{
	"code":"-2",
	"msg":"非法调用"
}

```

