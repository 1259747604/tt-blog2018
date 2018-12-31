const Router = require('koa-router');
const login = require('../control/login');//登录逻辑
const article = require('../control/article');//文章数据
const upload = require('../util/upload');
const home = require('../control/home');//主页数据
const music = require('../control/music');

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
// router.post('/upload/artImg',login.keepLogin,upload.uploadArtImg,article.uploadImg);
router.post('/upload/artImg',upload.uploadArtImg,article.uploadImg);

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

/*首页请求最新的一条数据*/
router.get('/newOne',home.newOne);

/*上传音乐*/
router.post('/musicUp',login.keepLogin,upload.uploadMusic,music.musicUpload);

/*上传歌词*/
router.post('/lrcUp',login.keepLogin,upload.uploadLrc,music.lrcUpload);

/*得到歌曲列表*/
router.post('/musicList',login.keepLogin,music.musicList);

/*删除音乐*/
router.delete('/music',login.keepLogin,music.delMusic);

/*更新首页音乐*/
router.post('/musicSelectOne',login.keepLogin,music.musicSelectOne);

/*获取选中的音乐*/
router.get('/musicName',login.keepLogin,music.musicName);
router.get('/indexMusicName',music.musicName);

/*请求首页音乐*/
router.get('/indexMusic/:id',music.indexMusic);

/*请求文章列表*/
router.get('/articleList/:pageNum',home.artList);

/*请求文章类型*/
router.get('/artTypeList',home.artType);

/*按类型请求文章数据*/
router.get('/typeForArticleList/:id/:index',home.artListofType);

/*导出*/
module.exports = router;