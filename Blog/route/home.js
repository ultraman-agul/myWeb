//引入express框架
const express = require('express')
//创建博客展示页面的路由
const home = express.Router()
//博客首页
home.get('/',require('./home/index'))
//文章详情页面
home.get('/article',require('./home/article'))
//文章评论路由
home.post('/comment',require('./home/comment'))
//导出路由
module.exports = home