//引入router模块
const getRouter = require('router')
//获取路由对象
const router = getRouter()
//引入模板引擎art-template
const template = require('art-template')
//创建数据集合
const Student = require('../model/user')
//引入解析数据模块
const querystring = require('querystring')

//呈递添加页面
router.get('/add',(req,res)=>{
    let html = template('index.art',{})
    res.end(html);
})
//呈递列表页面
router.get('/list',async (req,res)=>{
    let students = await Student.find() 
    let html = template('list.art',{
        students : students
    })
    res.end(html)
})
//实现学生信息添加功能路由
router.post('/add',(req,res)=>{
    //接受post请求参数
    let paramsData = ''
    req.on('data',params=>{
        paramsData += params
    })
    req.on('end',async ()=>{
        await Student.create(querystring.parse(paramsData))
        res.writeHead(301,{
            Location : '/list'
        })
        res.end()
    })
})

module.exports = router