//引入文章集合的构造函数
const { Article } = require('../../model/article')

//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page')
module.exports = async(req,res)=>{
    //标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article'
    //接收页码
    const page = req.query.page
    //查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(5).display(3).populate('author').exec()
    // res.send(articles)
    //渲染文章列表页面
    res.render('admin/article.art',{
        articles
    })
}