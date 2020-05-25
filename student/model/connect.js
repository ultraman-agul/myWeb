const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true,useUnifiedTopology: true  })
        .then('数据库连接成功')
        .catch('数据库连接失败')