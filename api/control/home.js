const {db} = require('../Schema/config');
const articleSchema = require('../Schema/articleSchema');
const artTypeSchema = require('../Schema/artTypeSchema');

/*文章集合*/
const Article = db.model('articles',articleSchema);

/*操作文章类型集合*/
const ArtType = db.model("artTypes",artTypeSchema);

//查找最新的一篇
exports.newOne = async (ctx) => {
    /*查找文章中最新的一条*/
    const data = await Article.find()
        .sort('-created')
        .populate('type','_id type')
        .limit(1)
        .then(data => data)
        .catch(err => {
            ctx.body = {
                status:0
            }
        });
    if(data){
        ctx.body = {
            data,
            status:1
        }
    }
};

//文章列表获取
exports.artList = async (ctx) => {
    let num = ctx.params.pageNum || 1;
    num--;
    const total =await Article.estimatedDocumentCount()
        .then(data => data);

    const data = await Article.find()
        .sort('-created')
        .skip(num*6)
        .limit(6)
        .populate('type','_id type')
        .then(data => data)
        .catch(err => []);
    ctx.body = {
        data,
        total
    }
};

//文章类型获取
exports.artType = async (ctx) => {
    const data = await ArtType.find()
        .then(data => data)
        .catch(err => {
            console.log(err);
            return []
        });
    ctx.body = {
        data
    }
};

//文章类型获取列表
exports.artListofType = async (ctx) => {
    let _id = ctx.params.id;
    let num = ctx.params.index;
    num--;

    //总数
    const total =await Article.countDocuments({type:_id})
        .then(data => data);

    if(_id !== 0){
        const data = await Article.find({type:_id})
            .sort('-created')
            .skip(num*6)
            .limit(6)
            .populate('type','_id type')
            .then(data => data)
            .catch(err => {
                console.log(err);
                return []
            });
        return ctx.body = {
            data,
            total
        }
    }
    return ctx.body = {
        data: [],
        total: 0
    }
};