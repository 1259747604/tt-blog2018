const {Schema} = require('./config');

//创建时间 音乐名称 音乐存储名称 歌词存储名称 歌词来源
const musicSchema = new Schema({
    name:String,
    pathName:String,
    pathLrc:String,
    lrcSource:String

},{
    versionKey:false,
    timestamps:{
        createdAt:'created'
    }
});

module.exports = musicSchema;