const {db} = require('../Schema/config');
const artTypeSchema = require('../Schema/artTypeSchema');

/*操作文章类型集合*/
const ArtType = db.model("artTypes",artTypeSchema);

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