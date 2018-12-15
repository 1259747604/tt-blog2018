// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './Store/index'//vuex
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import cookie from 'js-cookie';
import echarts from 'echarts';
import jquery from 'jquery';
import jqMouseWheel from 'jquery-mousewheel';

Vue.config.productionTip = false;

/*基本请求地址*/
axios.defaults.baseURL = 'http://127.0.0.1:3000';
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

/*cookie*/
Vue.prototype.Cookies = cookie;

/*echarts*/
Vue.prototype.echarts = echarts;

/*iView*/
Vue.use(iView,{
    transfer: true,
    size: 'large'
});
iView.LoadingBar.config({
    color: '#40B080',
    failedColor: '#f0ad4e',
    height: 5
});

/*jquery*/
Vue.prototype.$ = jquery;


/*页面进度条*/
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();//加载进度条
    window.document.title = to.meta.title;
    next();
});
router.afterEach(route => {
    iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
