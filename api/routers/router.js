const Router = require('koa-router');
const login = require('../control/login');//登录逻辑
const article = require('../control/article');//文章逻辑
const upload = require('../util/upload');

/*实例化Router*/
const router = new Router;

/*路由配置*/
/*首页请求*/
router.post("/loginstatus",login.keepLogin,login.home);

/*登录*/
router.post("/login",login.login);

/*退出用户*/
router.post('/out',login.signOut);

/*进入个人中心获得用户状态*/
router.get('/status',login.keepLogin,login.personal);

/*文章类型*/
router.get('/artType',login.keepLogin,article.artType);

/*新增文章类型*/
router.put('/newType',login.keepLogin,article.newType);

/*类型删除*/
router.delete('/arType',login.keepLogin,article.delType);

/*文章图片上传*/
router.post('/upload/artImg',login.keepLogin,upload.uploadArtImg,article.uploadImg);

/*发表文章*/
router.put('/articlePublish',login.keepLogin,article.artPublish);

/*文章列表获取*/
router.get('/article',login.keepLogin,article.getArticle);

/*动态页数*/
router.get('/article/page/:id',login.keepLogin,article.getArticle);

/*文章删除*/
router.delete('/article',login.keepLogin,article.delArticle);

/*文章更新*/
router.get('/article/up/:id',login.keepLogin,article.updatebeforeArticle);

/*修改文章*/
router.post('/articleUp',login.keepLogin,article.updateArticle);

/*文章类型选择*/
router.get('/selectList/:id',login.keepLogin,article.selectsArt);

/*文章类型选择切换页数*/
router.get('/selectList/:id/:page',login.keepLogin,article.selectsArt);

/*后台可视化所需数据*/
router.get('/artAnalyse',login.keepLogin,article.analyseArt);

/*请求旧密码*/
router.post('/initPwd',login.keepLogin,login.initPwd);

/*保存新密码*/
router.post('/newPwd',login.keepLogin,login.newPwd);

/*导出*/
module.exports = router;