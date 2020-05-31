//引入formidable第三方模块
const formidable = require('formidable')

//引入文章创建集合函数
const { Article } = require('../../model/article')

//引入path模块
const path = require('path')

module.exports = (req,res)=>{
    //创建表单解析对象
    const form = new formidable.IncomingForm()
    //配置上传文件的存放位置
    form.uploadDir = path.join(__dirname,'../','../','public/','upload/')
    //保留上传文件的后缀
    form.keepExtensions = true
    //解析表单
    form.parse(req, async(err,fields,files)=>{
        //err:保留错误对象  fields：保存普通的post数据  files：保存和上传文件相关的数据
        // res.send(files)
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],//截取地址为后部分
            content: fields.content
        })
        //将页面重定向到文章列表页面
        res.redirect('/admin/article')
    })
    // res.send('ok') 
}