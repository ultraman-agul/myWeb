//引入express框架
const express = require('express')
//创建博客管理页面的路由
const admin = express.Router()


//渲染登录页面
admin.get('/login',require('./admin/loginPage'))

//实现登录功能
admin.post('/login',require('./admin/login'))

//渲染用户页面
admin.get('/user',require('./admin/userPage'))

//实现退出登录功能
admin.get('/logout',require('./admin/logout'))

//渲染用户编辑页面
admin.get('/user-edit',require('./admin/user-edit'))

//创建实现用户添加功能的路由
admin.post('/user-edit',require('./admin/user-edit-fn'))

//创建比对密码功能的路由
admin.post('/user-modify',require('./admin/user-modify'))

//删除用户功能路由
admin.get('/delete',require('./admin/user-delete'))

//文章列表页面路由
admin.get('/article',require('./admin/article'))

//文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'))

//添加文章路由
admin.post('/article-add',require('./admin/article-add'))

//删除文章功能路由
admin.get('/article-delete',require('./admin/article-delete'))

//导出路由
module.exports = admin