const {db} = require("../Schema/config");
const userSchema = require("../Schema/userSchema");
const encrypt = require('../util/encrypt');

/*操作数据库*/
const User = db.model("users",userSchema);

/*登录逻辑*/
exports.login = async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    let msg = {};
    let session;
    await User.find({username})
        .then(data => {
            if(data.length === 0){
                return {msg:'用户名错误',status:0}
            }
            else if(data[0].password !== encrypt(password)){
                return {msg:'用户名或密码错误',status:0}
            }
            /*用户名和密码正确*/
            session = {
                uid : data[0]._id,
                username : data[0].username,
                avatar : data[0].avatar,
                role : data[0].role
            };
            return {msg:'登录成功',status:1}
        })
        .then(data => {
            msg = data;
            if(data.status){
                ctx.session =  session;
                /*设置session*/
                msg.session = ctx.session;
            }
        })
        .catch(err => {
            msg = {
                msg:'登录失败 请重新尝试',
                status:0
            }
        });
    ctx.body = msg
};

/*保持登录*/
exports.keepLogin = async (ctx,next) => {
    if(ctx.session.isNew){
        return ctx.body = {
            keepStatus : 408
        }
    }
    await next();
};

/*首页*/
exports.home = async (ctx) => {
    ctx.body = {
        session: ctx.session,
        keepStatus : 200
    }
};

/*个人中心*/
exports.personal = async (ctx) =>{
    ctx.body = {
        keepStatus : 200
    }
};

/*退出登录*/
exports.signOut = async (ctx) => {
    ctx.session = null;
    ctx.body = {
        status : 1
    }
};