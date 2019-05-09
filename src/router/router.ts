import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // nprogress 样式文件

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        { path: '*', redirect: '/' },
        {
            path: '/',
            name: 'login',
            component: () => import('../Login.vue'),
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('../components/layouts/index.vue'),
            children: [
                {
                    path: 'Home',
                    name: 'Home',
                    component: () => import('../views/Home.vue'),
                },
                {
                    path: 'About',
                    name: 'About',
                    component: () => import('../views/About.vue'),
                },
            ],
        },
    ],
});


// 当路由开始跳转时
router.beforeEach((to, from , next) => {
    // 开启进度条
    NProgress.start();
    // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next();
});
// 当路由跳转结束后
router.afterEach(() => {
    // 关闭进度条
    NProgress.done();
});


export default router;
