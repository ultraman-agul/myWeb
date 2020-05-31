const { User }=require('../../model/user')
module.exports = async (req,res)=>{
    //标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user'
    //接受客户端传递的当前页数
    let page = req.query.page||1
    //每一页显示的数据条数
    let pagesize = 10
    //查询数据库中数据总的条数
    let count = await User.countDocuments({})
    //设置总的页数=数据库数据条数/每页数据条数 再向上取整
    let total = Math.ceil(count/pagesize)
    let start = (page - 1)*pagesize
    //将用户信息从数据库查询出来
    let users = await User.find({}).limit(pagesize).skip(start)
    //渲染用户列表
    res.render('admin/user',{
        users : users,
        page : page,
        total : total
    })
 }