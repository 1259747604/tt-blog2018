const {db} = require('../Schema/config');
const musicSchema = require('../Schema/musicSchema');
const musicSelectSchema = require('../Schema/musicSelectSchema');
const fs = require('fs');
const {join}= require('path');

//操作音乐数据库
const Music = db.model('musics',musicSchema);
const MusicS = db.model('musicSelects',musicSelectSchema);

/*保存音乐到数据库*/
exports.musicUpload = async (ctx) => {
    // const name = Object.keys(ctx.request.files)[0];//得到需要存储到数据库的name
    const name = ctx.request.body.name;//得到需要存储到数据库的name
    const pathName = ctx.request.files[name].name;//得到存储到数据库的路径名称

    //得到存储是否成功 1为成功 0为失败
    const status = await new Promise((resolve, reject) => {
        Music.find({name})
            .then(data => {
                resolve(data);
            })
    })
        .then(async data => {
            //如果为空则新增
            if(data.length === 0){
                return await new Music({
                    name,
                    pathName,
                }).save()
                    .then(data => 1)
                    .catch(err => 0)
            }
            //如果有值 则更新 更新前先删除
            if(data[0].pathName){
                fs.unlink(join(`./static/music/${data[0].pathName}`),err => {
                    if(err){
                        console.log(err);
                    }
                });
            }

            return await Music.updateOne({name},{$set:{pathName}})
                .then(data => 1)
                .catch(err => 0);
        })
        .catch(err => 0);

    ctx.body = {
        status
    }
};

/*保存歌词到数据库*/
exports.lrcUpload = async (ctx) => {
    const name = ctx.request.body.name;//得到需要存储到数据库的name
    const lrcSource = ctx.request.body.lrcSource;//得到歌词来源
    const pathLrc = ctx.request.files[name].name;//得到存储到数据库的路径名称

    //得到存储是否成功 1为成功 0为失败
    const status = await new Promise((resolve, reject) => {
        Music.find({name})
            .then(data => {
                resolve(data);
            })
    })
        .then(async data => {
            //如果为空则新增
            if(data.length === 0){
                return await new Music({
                    name,
                    pathLrc,
                    lrcSource
                }).save()
                    .then(data => 1)
                    .catch(err => 0)
            }
            //如果有值 则更新 更新前先删除
            if(data[0].pathLrc){
                fs.unlink(join(`./static/lrc/${data[0].pathLrc}`),err => {
                    if(err){
                        console.log(err);
                    }
                });
            }

            return await Music.updateOne({name},{$set:{pathLrc,lrcSource}})
                .then(data => 1)
                .catch(err => 0);
        })
        .catch(err => 0);

    ctx.body = {
        status
    }
};

/*歌曲列表*/
exports.musicList = async (ctx) => {
    const data = await Music.find()
        .sort('-created')
        .then(data => data)
        .catch(err => []);
    ctx.body = {
        status : 1,
        data
    };
};

/*删除音乐*/
exports.delMusic = async (ctx) => {
    const name = ctx.request.body.name;

    /*删除文件*/
    await Music.find({name})
        .then(data => {
            fs.unlink(join(`./static/music/${data[0].pathName}`),err => {
                if(err){
                    console.log(err);
                }
            });
            fs.unlink(join(`./static/lrc/${data[0].pathLrc}`),err => {
                if(err){
                    console.log(err);
                }
            });
        })
        .catch(err => {
            console.log(err);
        });

    /*删除文档*/
    const status = await Music.deleteOne({name})
        .then(data => 1)
        .catch(err => 0);

    ctx.body = {
        status
    }
};

/*更新首页播放的音乐*/
exports.musicSelectOne = async (ctx) => {
     const id = ctx.request.body.id;//得到展示的id

    //更新数据库 此集合保持为一条文档
    const status = await MusicS.find()
        .then(async data => {
            if(data.length === 0){
                return await new MusicS({
                    selectName:id
                }).save()
                    .then(data => 1)
                    .catch(err => 0)
            }

            return await MusicS.updateOne({_id:data[0]._id},{$set:{selectName:id}})
                .then(data => 1)
                .catch(err => 0);
        })
        .catch(err => 0);

    ctx.body = {
        status
    }
};

/*获取选中的音乐*/
exports.musicName = async (ctx) => {
    const data = await MusicS.find()
        .populate('selectName','_id name')
        .then(data => data)
        .catch(err => console.log(err));

    ctx.body = {
        data
    }
};

/*请求首页音乐*/
exports.indexMusic = async (ctx) => {
    const _id = ctx.params.id;

    //获取名称
    const data = await Music.findOne({_id})
        .then(data => data)
        .catch(err => err);

    const {pathName,pathLrc,lrcSource} = data;

    //读取数据
    let lrc = await new Promise((resolve, reject) => {
        fs.readFile(join(`./static/lrc/${pathLrc}`),(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                if(lrcSource === 'qq'){
                    let result = data.toString('utf8');
                    resolve(result);
                }
                else if(lrcSource === '网易'){
                    const json = JSON.parse(data.toString('utf8'));
                    const lrc = json.lrc.lyric;
                    resolve(lrc);
                }
            }
        })
    })
        .then(data => data);
    let music = await new Promise((resolve, reject) => {
        fs.readFile(join(`./static/music/${pathName}`),(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    }).then(data => data);

    ctx.body = {
        lrc,
        music,
        lrcSource
    };
};