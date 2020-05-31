const { Article } = require('../../model/article')

module.exports = async(req,res)=>{
    //标识当前访问的是用户修改页面
    req.app.locals.currentLink = 'article'
    //提示信息和id参数
    const { id } = req.query
    //有id则修改操作
    if(id){
        let article = await Article.findOne({_id:id})
        //渲染修改页面
        res.render('admin/article-edit',{
            article:article,
        })
    }
    else{
        res.render('admin/article-edit.art')
    }
}
