const routes = [
    {
        path:'*',
        meta:{
            title: '404'
        },
        component: (resolve) => require(['../Pages/404'],resolve),
    },
    {
        path: '/',
        meta:{
            title: 'TT首页'
        },
        name: 'home',
        component: (resolve) => require(['../Pages/Home'],resolve),
    },
    {
        path: '/articleList',
        meta:{
            title: 'TT文章列表'
        },
        name: 'articleList',
        component: (resolve) => require(['../components/article/articleList'],resolve),
    },
    {
        path: '/login',
        meta:{
            title: '登录页'
        },
        name: 'login',
        component: (resolve)=>require(['../Pages/loginPage'],resolve),
    },
    {
        path: '/personal',
        meta:{
            title: '个人中心'
        },
        name: 'personal',
        component: (resolve)=>require(['../Pages/personal'],resolve),
        redirect: {name: 'analyses'},
        children:[
            {
                path:'analyses',
                meta:{
                    title: '个人中心-文章分析'
                },
                name: 'analyses',
                component: (resolve) => require(['../components/personalComponents/analyseArt'],resolve),
            },
            {
                path:'artManage',
                meta:{
                    title: '个人中心-文章管理'
                },
                name: 'artManage',
                component: (resolve) => require(['../components/personalComponents/artManage'],resolve),
                children:[
                    {
                        path:'artList',
                        meta:{
                            title:'个人中心-文章列表'
                        },
                        name:'artList',
                        component: (resolve) => require(['../components/personalComponents/articleList'],resolve),
                    },
                    {
                        path:'artListType/:id',
                        meta:{
                            title:'个人中心-文章列表'
                        },
                        name:'artListType',
                        component: (resolve) => require(['../components/personalComponents/artSelect'],resolve),
                    }
                ],
                redirect: { name: 'artList' }
            },
            {
                path:'article/:id',
                meta:{
                    title: '个人中心-修改文章'
                },
                name: 'updateArt',
                component: (resolve) => require(['../components/personalComponents/updateArt'],resolve),
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
                path:'musicManage',
                meta:{
                    title: '个人中心-更换音乐'
                },
                name: 'musicManage',
                component: (resolve) => require(['../components/personalComponents/musicManage'],resolve),
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