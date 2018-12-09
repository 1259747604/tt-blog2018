const Router = require('koa-router');
const login = require('../control/login');//登录逻辑
const article = require('../control/article');//文章逻辑

/*实例化Router*/
const router = new Router;

/*路由配置*/
/*首页请求*/
router.post("/loginstatus",login.home);

/*登录*/
router.post("/login",login.login);

/*退出用户*/
router.post('/out',login.signOut);

/*文章类型*/
router.get('/artType',article.artType);

/*新增文章类型*/
router.put('/newType',article.newType);

/*类型删除*/
router.delete('/arType',article.delType);

/*导出*/
module.exports = router;