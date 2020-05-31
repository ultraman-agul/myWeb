const mongoose = require('mongoose')

//创建文章评论集合规则
const commentSchema = new mongoose.Schema({
    //文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
})

//创建评论集合
const Comment = mongoose.model('Comment',commentSchema)

module.exports = {
    Comment
}