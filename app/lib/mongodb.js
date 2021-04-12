const mongoose = require('mongoose');


// mongoose.options = options

mongoose.connect("mongodb://localhost:27017/test", {}, function (err) {
    if (err) {
        console.log("mongodb链接失败");
    } else {
        console.log("数据库连接成功")
    }
})

const db = mongoose.connection;

module.exports = db;
