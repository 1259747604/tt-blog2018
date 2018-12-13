const {db} = require('../Schema/config');
const artTypeSchema = require('../Schema/artTypeSchema');
const articleSchema = require('../Schema/articleSchema');
const artNumSchema = require('../Schema/artNumSchema');
/*const fs = require('fs');
const {join} = require('path');*/
const baseUrl = require('../routers/baseUrl');//获取基础请求地址

/*操作文章类型集合*/
const ArtType = db.model("artTypes",artTypeSchema);

/*操作文章数据集合*/
const Article = db.model("articles",articleSchema);

/*操作文章数量集合*/
const ArtNum = db.model('artMonthTotals',artNumSchema);

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

    /*删除月统计*/
    await Article.find({type:_id})
        .then(async data => {
            /*得到一个文章数组*/
            const len = data.length;
            if(len !== 0){
                for(let i = 0; i < len; i++){
                    let year = new Date(data[i].created).getFullYear();
                    let month = new Date(data[i].created).getMonth();

                    /*更新月统计*/
                    await ArtNum.updateOne({year},{$inc:{[`count.${month}`]:-1}})
                        .exec(err => {if(err) return err});
                }
            }
        }).catch(err => {if(err) return console.log(err)});

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

    /*文章月统计*/
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    await ArtNum.find({year})
        .then(data => {
            if(data.length === 0){
                return year;
            }
            else{
                return month;
            }
        })
        .then(async data => {
            if(data === year){
                await new ArtNum({year}).save();
            }
            await ArtNum.updateOne({year},{$inc:{[`count.${month}`]:1}}).exec(err =>{if(err) return err});
        });

    /*类型计数器增加*/
    await ArtType.updateOne({_id:data.id},{$inc:{count:1}})
        .exec(err => {
            if(err) return console.log(err);
        });

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
    /*获取当前页数*/
    let index= ctx.params.id || 1;
    index --;

    const total =await Article.estimatedDocumentCount()
        .then(data => data);

    /*获取文章列表*/
    const data = await Article.find()
        .populate('type','_id type')
        .sort('-created')
        .limit(10)
        .skip(index*10)
        .then(data => data)
        .catch(err => {console.log(err)});

    ctx.body = {
        status: 1,
        data,
        total
    }
};

/*后台文章删除*/
exports.delArticle = async (ctx) => {
    /*获取要删除的id*/
    const _id = ctx.request.body.id;

    /*获取类型Id*/
    const typeId = ctx.request.body.typeId;

    /*更新计数器*/
    await ArtType.updateOne({_id:typeId},{$inc:{count:-1}})
        .exec(err => {
            if(err) return console.log(err);
        });
    /*更新月统计*/
    await Article.find({_id})
        .then(data => {
            return {
                year: new Date(data[0].created).getFullYear(),
                month: new Date(data[0].created).getMonth()
            }
        })
        .then(async data => {
            await ArtNum.updateOne({year:data.year},{$inc:{[`count.${data.month}`]:-1}})
                .exec(err => {if(err) return err});
        });

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
    const initTypeId = data.initTypeId;//更新前文章id;

    /*如果不等于即更新计数*/
    if(type !== initTypeId){
        await ArtType.updateOne({_id:type},{$inc:{count:1}})
            .exec(err => {
                if(err) return console.log(err);
            });
        await ArtType.updateOne({_id:initTypeId},{$inc:{count:-1}})
            .exec(err => {
                if(err) return console.log(err);
            });
    }
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

    /*获取总数*/
    const total =await Article.countDocuments({type:id})
        .then(data => data);

    /*获取页码*/
    let num = ctx.params.page || 1;
    num--;

    /*查询数据库*/
    const data = await Article.find({type:id})
        .populate('type', '_id type')
        .sort('-created')
        .limit(10)
        .skip(num*10)
        .then(data => data)
        .catch(err => {
            ctx.body = {
                status: 0
            }
        });

    ctx.body = {
        status: 1,
        total,
        data
    }
};

/*后台数据可视化所需数据*/
exports.analyseArt = async (ctx) => {
    /*所需数据 文章类型表 月统计表*/
    let data;
    let data1;
    await ArtType.find()
        .then(res => {
            data = res;
        })
        .catch(err => {
            return console.log(err);
        });
    await ArtNum.find({year:new Date().getFullYear()})
        .then(res => {
           data1 = res;
        })
        .catch(err => {
            return console.log(err);
        });

    ctx.body = {
        status:1,
        data,
        data1
    }
};