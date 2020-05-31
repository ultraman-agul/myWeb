//引入用户创建集合函数
const { User } = require('../../model/user')
//引入bcrypt模块
const bcrypt = require('bcrypt')
module.exports = async (req,res,next)=>{ 
    //客户端传来的表单参数
    const {username,email,role,state,password} = req.body
    //即将修改的用户的id
    const {id} = req.query
    let user = await User.findOne({_id:id})
    const isValid = await bcrypt.compare(password,user.password)
    //密码比对成功
    if(isValid){
        // res.send('比对成功')
        //从数据库中修改信息
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        })
        //重定向到用户列表页面
        res.redirect("/admin/user")
    }else{
        //密码比对失败
        // res.send('比对失败')
        let obj = {path:'/admin/user-edit',message:"密码比对失败，不能进行用户信息修改",id:id}
        next(JSON.stringify(obj))
}
}
