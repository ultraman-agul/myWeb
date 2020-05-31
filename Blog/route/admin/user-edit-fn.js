//引入bcrypt加密模块
const bcrypt = require('bcrypt')
//引入用户集合的构造函数
const { User,validataUser } = require('../../model/user')

module.exports = async (req,res,next)=>{
    try{
        await validataUser(req.body)
    }catch(e){
        //验证不通过，重定向到用户添加页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`)
        return next(JSON.stringify({path: '/admin/user-edit', message: e.message}))//对象转为string
    }

    //根据邮箱地址验证数据库中是否已经存在
    let user = await User.findOne({email: req.body.email})
    if(user){
        //存在该用户，则提示邮箱地址被占用，重定向到添加用户页面
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用了`)
        return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
    }

    //对用户密码加密
    //生成盐
    const salt = await bcrypt.genSalt(10)
    //加密
    const password = await bcrypt.hash(req.body.password,salt)
    //替换
    req.body.password = password

    //将用户添加到数据库当中
    await User.create(req.body)
    res.redirect('/admin/user')
}