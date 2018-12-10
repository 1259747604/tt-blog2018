const Router = require('koa-router');
const login = require('../control/login');//登录逻辑
const article = require('../control/article');//文章逻辑
const upload = require('../util/upload');

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

/*文章图片上传*/
router.post('/upload/artImg',upload.uploadArtImg,article.uploadImg);

/*发表文章*/
router.put('/articlePublish',article.artPublish);

/*文章列表获取*/
router.get('/article',article.getArticle);

/*文章删除*/
router.delete('/article',article.delArticle);

/*文章更新*/
router.get('/article/up/:id',article.updatebeforeArticle);

/*修改文章*/
router.post('/articleUp',article.updateArticle);

/*文章类型选择*/
router.get('/selectList/:id',article.selectsArt);

/*导出*/
module.exports = router;