const routes = [
    {
        path: '/',
        meta:{
            title: 'TT首页'
        },
        name: 'home',
        component: (resolve) => require(['../components/home'],resolve),
    },
    {
        path: '/login',
        meta:{
            title: '登录页'
        },
        name: 'login',
        component: (resolve)=>require(['../components/loginPage'],resolve),
    },
    {
        path: '/personal',
        meta:{
            title: '个人中心'
        },
        name: 'personal',
        component: (resolve)=>require(['../components/personal'],resolve),
        children:[
            {
                path:'artManage',
                meta:{
                    title: '个人中心-文章管理'
                },
                name: 'artManage',
                component: (resolve) => require(['../components/personalComponents/artManage'],resolve),
            },
            {
                path:'article',
                meta:{
                    title: '个人中心-写文章'
                },
                name: 'article',
                component: (resolve) => require(['../components/personalComponents/article'],resolve),
            },
            {
                path:'artType',
                meta:{
                    title: '个人中心-设置文章类型'
                },
                name: 'artType',
                component: (resolve) => require(['../components/personalComponents/artType'],resolve),
            },
            {
                path:'avatar',
                meta:{
                    title: '个人中心-头像'
                },
                name: 'avatar',
                component: (resolve) => require(['../components/personalComponents/avatar'],resolve),
            },
            {
                path:'pwd',
                meta:{
                    title: '个人中心-密码'
                },
                name: 'pwd',
                component: (resolve) => require(['../components/personalComponents/changepwd'],resolve),
            },
        ]
    }
];
export default routes