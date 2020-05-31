const { Article } = require('../../model/article')
//导入分页模块
const pagination = require('mongoose-sex-page')
module.exports = async (req,res)=>{
    //获取页码值
    const page = req.query.page
    //从数据库中查找数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec()
    // console.log(result)
    //渲染模板
    // res.send('ok')
    res.render('home/default.art',{
        result: result
    })
}