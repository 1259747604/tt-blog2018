const Koa = require('koa');
const router = require("./routers/router");
const cors = require("@koa/cors");//cors跨域解决
const koaBody = require('koa-body');
const static = require('koa-static');//静态资源
const {join} = require('path');
const KoaSession = require('koa-session');//session

/*操作数据库*/
const {db} = require('./Schema/config');
const userSchema = require('./Schema/userSchema');
const encrypt = require('./util/encrypt');

/*实例化koa*/
const app = new Koa;

/*cors跨域*/
app.use(cors({
    // origin:"http://localhost:8080",
    credentials : true
}));
/*配置session*/
app.keys = ["tt is a good boy"];
const CONFIG = {
    key : "tt is a bad boy",//密匙
    maxAge : 7200000,//过期时间 2小时
    autoCommit : true,//自动提交头文件
    overwrite : true,//是否覆盖
    httpOnly : true,//不允许客户端读取
    signed : true,//是否签名
    rolling : true//是否刷新
};
app.use(KoaSession(CONFIG,app));

/*静态资源*/
app.use(static(join(__dirname,'static')));

/*koaBody*/
app.use(koaBody({
    strict  : false,
}));

/*路由*/
app.use(router.routes())
    .use(router.allowedMethods());

/*监听端口*/
app.listen(3000,()=>{
    console.log(`服务监听在3000端口`);
});

/*发表账号*/
{
    const User = db.model('users',userSchema);
    const username = 'HH小笼包';

    /*查数据库*/
    User.find({username})
        .then(data => {
            /*存在*/
            if(data.length !== 0 )return data;
            /*不存在即创建*/
            const pwd = 'ttisgoodboy';
            new User({
                username: 'HH小笼包',
                password: encrypt(pwd),
                role: '666'
            })
                .save(err => {
                    if(err)
                        return console.log(err);
                })
        })
        .catch(err => console.log(err));
}