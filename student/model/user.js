const mongoose = require('mongoose')
//创建集合规则
const studentsSchema = new mongoose.Schema({
    name:{
        type: String,
        require : true,
        minlength : 2,
        maxlength : 10
    },
    age:{
        type : Number,
        require : true,
        min : 10,
        max : 25
    },
    sex:{
        type : String,
    },
    email : String,
    hobbies : [String],
    collage : String,
    enterDate : {
        type : Date,
        default : Date.now
    }
})
//通过集合规则创建集合
const Student = mongoose.model('Student',studentsSchema)
//导出集合构造函数
module.exports = Student