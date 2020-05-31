const { User } = require('../../model/user')

module.exports = async (req,res)=>{
    //标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user'
    //提示信息和id参数
    const {message, id} = req.query
    //有id则修改操作
    if(id){
        let user = await User.findOne({_id:id})
        //渲染修改页面
        res.render('admin/user-edit',{
            message:message,
            user:user,
            link:'/admin/user-modify?id='+id,
            button:'修改'
        })
    }else{//添加操作
        res.render('./admin/user-edit',{
            message:message,
            link:'/admin/user-edit',
            button:'添加'
        })
    }
    
}