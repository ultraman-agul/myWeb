const { Article } = require('../../model/article')
//引入文章评论集合的构造函数
const { Comment } = require('../../model/comment')
module.exports = async (req,res)=>{
    //获取文章id
    const id = req.query.id
    //根据文章id查询文章信息
    let article = await Article.findOne({_id:id}).populate('author')
    let comment = await Comment.find({aid:id}).populate('uid')
    // res.send(article)
    res.render('home/article',{article,comment})
}