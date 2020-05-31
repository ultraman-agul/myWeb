//导入评论构造函数集合
const { Comment } = require('../../model/comment')

module.exports = async (req,res)=>{
    const { content,uid,aid } = req.body
    // console.log(content)
    //将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    })
    //重定向到文章详情页面
    res.redirect('/home/article?id='+aid)
}
