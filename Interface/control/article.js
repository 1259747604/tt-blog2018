const {db} = require('../Schema/config');
const artTypeSchema = require('../Schema/artTypeSchema');
const articleSchema = require('../Schema/articleSchema');
/*const fs = require('fs');
const {join} = require('path');*/
const baseUrl = require('../routers/baseUrl');//获取基础请求地址

/*操作文章类型集合*/
const ArtType = db.model("artTypes",artTypeSchema);

/*操作文章数据集合*/
const Article = db.model("articles",articleSchema);

/*文章类型*/
exports.artType = async (ctx) => {
    /*获取客户端请求后操作*/
    await ArtType.find()
        .then(data => {
            ctx.body = {
                status: 1,
                data
            }
        })
        .catch(err => {
            ctx.body = {
                status: 0,
            };
            console.log(err);
        })
};

/*新增文章类型*/
exports.newType = async (ctx) => {
    /*获取客户端提交的数据*/
    const type = ctx.request.body.type;

    /*保存至数据库*/
    await new ArtType({type})
        .save()
        .then(data => {
            ctx.body = {
                status : 1
            }
        })
        .catch(err => {
            ctx.body = {
                status : 0
            }
        })
};

/*删除文章类型*/
exports.delType = async (ctx) => {
    const _id = ctx.request.body.id;

    /*删除对应类型下的文章*/
    await Article.deleteMany({type:_id})
        .exec(err => {
            if(err) return console.log(err);
        });

    /*删除文章类型*/
    await ArtType.findOneAndDelete({_id})
        .then(data => {
            ctx.body = {
                status:1
            }
        })
        .catch(err => {
            ctx.body = {
                status:0
            }
        });
};

/*文章图片上传*/
exports.uploadImg = async (ctx) => {
    const file = ctx.request.files;
    if(file){
        let url = '';
        for(let key in file){
            url = file[key].name
        }
        ctx.body = {
            "errno": 0,
            "data":[`${baseUrl}/artImg/${url}`]
        };
        /*后续删除图片扩展*/
       /* fs.unlink(join(`./static/artImg/${url}`),err => {
            if(err) return console.log(err);
            console.log(`success`);
        });*/
    }
};

/*文章发表*/
exports.artPublish = async (ctx) => {
    /*获取文章数据*/
    const data = ctx.request.body;
    /*保存*/
    await new Article({
        title: data.title,
        author: ctx.session.uid,
        content: data.content,
        type: data.id,
    })
        .save()
        .then(data => {
            ctx.body = {
                status: 1
            }
        })
        .catch(err => {
            ctx.body = {
                status: 0
            }
        });
};

/*后台文章列表获取*/
exports.getArticle = async (ctx) => {
    /*获取文章列表*/
    const id = ctx.session.uid;
    await Article.find({author:id})
        .populate('type','_id type')
        .sort('-created')
        .then(data => {
            ctx.body = {
                status: 1,
                data
            }
        })
        .catch(err => {
            ctx.body = {
                status: 0
            }
        });
};

/*后台文章删除*/
exports.delArticle = async (ctx) => {
    /*获取要删除的id*/
    const _id = ctx.request.body.id;

    /*删除*/
    await Article.findOneAndDelete({_id})
        .then(data => {
            ctx.body = {
                status : 1
            }
        })
        .catch(err => {
            ctx.body = {
                status : 0
            }
        })
};

/*文章更新前数据获取*/
exports.updatebeforeArticle = async (ctx) => {
    const _id = ctx.params.id;

    await Article.find({_id})
        .populate('type','_id type')
        .then(data => {
            ctx.body = {
                status : 1,
                data
            }
        })
        .catch(err => {
            ctx.body = {
                status: 0
            }
        });
};

/*文章更新*/
exports.updateArticle = async (ctx) => {
    const data = ctx.request.body;
    const _id = data.id;//文章id
    const type = data.typeId;//文章类型
    const title = data.title;//文章标题
    const content = data.content;//文章内容

    await Article.updateOne({_id},{$set:{type,title,content}})
        .then(data =>{
            ctx.body = {
                status: 1
            }
        })
        .catch(err => {
            ctx.body = {
                status: 0
            }
        });
};

/*文章选择类型显示*/
exports.selectsArt = async (ctx) => {
    /*获取类型ID*/
    const id = ctx.params.id;

    /*查询数据库*/
    await Article.find({type:id})
        .populate('type', '_id type')
        .sort('-created')
        .then(data => {
            ctx.body = {
                status: 1,
                data
            }
        })
        .catch(err => {
            ctx.body = {
                status: 0
            }
        });
};