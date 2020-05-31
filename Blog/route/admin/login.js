//引入用户集合
const {User} = require('../../model/user')
//导入bcrypt模块
const bcrypt = require('bcrypt')

module.exports = async (req,res)=>{
    //处理请求参数
    const {email,password} = req.body
    //当请求内瓤为空时
    if(email.trim().length == 0 || password.trim().length == 0)
       return res.status(400).render('admin/error',{msg:'邮箱地址或者密码输入错误'})
    //根据邮箱地址查询数据库是否存在该用户
    let user = await User.findOne({email})
    if(user){//存在该用户
       //密码比对，返回值是Boolean类型
       let isEqual = await bcrypt.compare(password,user.password)
       if(isEqual){//密码正确
          //将用户名存储到请求对象当中
          req.session.username = user.username
          //将用户角色存储到session对象中
          req.session.role = user.role
          //将用户信息存储到locals对象下，模板中能拿到这个信息了
          req.app.locals.userInfo = user
          //对用户的角色进行判断
         if(user.role == 'admin'){//重定向到用户管理
            res.redirect('/admin/user')
         }else{//重定向到博客首页
            res.redirect('/home/')
         }
       }else{//密码不正确
          return res.status(400).render('admin/error',{msg:'邮箱地址或者密码输入错误'})
       }
    }else{//用户不存在
       return res.status(400).render('admin/error',{msg:'邮箱地址或者密码输入错误'}) 
    }
 }  