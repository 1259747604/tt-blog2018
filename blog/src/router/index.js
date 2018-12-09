import Vue from 'vue'
import Router from 'vue-router'

import axios from 'axios';
import cookie from 'js-cookie';

/*路由*/
Vue.use(Router);

/*axios*/
/*基本请求地址*/
axios.defaults.baseURL = 'http://127.0.0.1:3000';
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

/*cookie*/
Vue.prototype.Cookies = cookie;


/*路由配置*/
import routes from './routers'

export default new Router({
    mode: 'history',
    routes
})
