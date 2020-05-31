module.exports = (req,res,next)=>{
    //用户请求的是访问非登录页面，并且没有登录
    if(req.url != '/login' && !req.session.username){
        res.redirect('/admin/login') //重定向到登录页面
    }else{
        if(req.session.role == 'normal'){
            //让它跳转到博客首页，阻止程序向下执行
            return res.redirect('/home/')
        }
        //用户是登录状态，放行
        next()
    }
}