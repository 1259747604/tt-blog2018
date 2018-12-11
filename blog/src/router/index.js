import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers';//路由配置


/*路由*/
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes
})
