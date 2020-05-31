const { Article } = require('../../model/article')
module.exports = async (req,res)=>{
    //根据文章id删除文章
    await Article.findOneAndDelete({_id:req.query.id})
    //重定向到文章列表页面
    res.redirect('/admin/article')
}