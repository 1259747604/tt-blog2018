const {Schema} = require('./config');
const ObjectId = Schema.Types.ObjectId;

/*文章名 文章简介 作者 内容 文章类型 发表日期 发表月份 发表年份*/
const articleSchema = new Schema({
    title: String,
    synopsis:{
        type:String,
        default:''
    },
    author:{
        type: ObjectId,
        ref: 'users'
    },
    content: String,
    type: {
        type: ObjectId,
        ref: 'artTypes'
    },
},{
    versionKey:false,
    timestamps:{
        createdAt:"created"
    }
});

module.exports = articleSchema;