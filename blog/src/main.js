// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

/*vuex*/
import store from './vuex/index'

/*iview*/
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView,{
    transfer: true,
    size: 'large'
});
iView.LoadingBar.config({
    color: '#40B080',
    failedColor: '#f0ad4e',
    height: 3
});

/**/


/*进入对应路由前*/
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
