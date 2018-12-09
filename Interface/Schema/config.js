const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://localhost:27017/blog',{ useNewUrlParser: true });

/*使用原生promise*/
mongoose.Promise = global.Promise;

/*Schema*/
const Schema = mongoose.Schema;

db.on("open",() => {
    console.log(`数据库连接成功`);
});
db.on("err",() => {
    console.log(`数据库连接失败`);
});

module.exports = {
    db,
    Schema
};