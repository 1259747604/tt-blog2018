const {db} = require('../Schema/config');
const articleSchema = require('../Schema/articleSchema');

/*文章集合*/
const Article = db.model('articles',articleSchema);

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