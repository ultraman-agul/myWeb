//引入express框架
const express = require('express')
//处理路径
const path = require('path')
//引入body-parser模块
const bodyParser = require('body-parser')
//引入express-session模块
const session = require('express-session')
//导入art-template模板引擎
const template = require('art-template')
//导入dateformat第三方模块
const dateFormat = require('dateformat')
//导入morgan第三方模块
const morgan = require('morgan')
//导入config模块
const config = require('config')
//创建网站服务器
const app = express()
//连接数据库
require('./model/connect')
//处理post请求参数
app.use(bodyParser.urlencoded({extended: false}))
//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized:false,
    cookie:{ maxAge: 24*60*60*1000 }
}))
//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')))
//获取环境变量
if(process.env.NODE_ENV == 'development'){
    //开发环境,将客户端请求打印到控制台中
    app.use(morgan('dev'))
}else{
    
}
console.log(config.get('title'))
//告诉express框架模板的位置
app.set('views',path.join(__dirname,'views')) //注意是views
//告诉express框架默认的模板后缀
app.set('view engine','art') //注意是view engine
//所使用的渲染引擎
app.engine('art',require('express-art-template'))
//引入路由对象
const home = require('./route/home')
const admin = require('./route/admin')

//用户拦截，判断用户是否为登录状态
app.use('/admin',require('./middleware/loginGard'))
app.use('/home',home)
app.use('/admin',admin)

// 错误处理中间件
app.use((err,req,res,next)=>{
    //字符串转为对象
    const result = JSON.parse(err);
    //数组接受传递的参数
    let params = []
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + "=" + result[attr])
        }
    }
	res.redirect(`${result.path}?${params.join('&')}`);
})
//监听端口
app.listen(3000)
console.log('网站服务器启动成功')