const http = require('http')
//引入path模块
const path = require('path')
//引入模板引擎art-template
const template = require('art-template')
//引入静态资源访问模块
const serveStatic = require('serve-static')
//实现静态资源访问服务
const serve = serveStatic(path.join(__dirname,'public'))
//引入格式日期时间模块
const dateformat = require('dateformat')
//引入router
const router = require('./router/index')
//创建服务器
const app = http.createServer()
//连接数据库
require('./model/connect')

//渲染的默认路径
template.defaults.root = path.join(__dirname,'views')
//处理日期格式的方法
template.defaults.imports.dateformat = dateformat

//接收、响应请求
app.on('request',(req,res)=>{
    router(req,res,()=>{})
    serve(req,res,()=>{})
})
app.listen(3000)
console.log('服务器启动成功')