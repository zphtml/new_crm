// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhNormal from './lang/zh-normal'
import zhQs from './lang/zh-qs'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import * as filters from './filters';
import Jurisdiction from './store/Jurisdiction'
import permission from './store/permission';
import VueTouch from 'vue-touch'
import Vue2Filters from 'vue2-filters';
Vue.use(Jurisdiction);
Vue.use(VueTouch, {name: 'v-touch'})
import _ from 'lodash';
import VueI18n from 'vue-i18n';
window._= _;
// register globally
Vue.use(Vue2Filters);
Vue.use(VueI18n);

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const i18n = new VueI18n({
    // locale: 'zh-qs',
    locale: 'zh-normal',
    messages: {
        'zh-normal': {
            ...zhNormal,
            ...zhLocale
        },
        'zh-qs':{
            ...zhQs,
            ...zhLocale
        }
    }
});
Vue.use(ELEMENT,{
    i18n: (key, value) => i18n.t(key, value),
    size: 'small'
});

// register global progress.
const whiteList = ['/login','/wechat_login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress

    if (store.getters.token) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {
            permission.init({ // 初始化权限
                roles: store.getters.roles,
                router: router.options.routes
            });
            if (to.meta && to.meta.role) { // 判断即将进入的页面是否需要权限

                if (permission.hasPermission(store.getters.roles, to)) { // 判断权限

                    next(); // 有权限
                } else {
                    next('/401'); // 无权限
                    NProgress.done();
                }
            } else { // 页面不需要权限 直接进入
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登入白名单，直接进入
            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }
});

router.afterEach(to => {
    NProgress.done(); // 结束Progress
    if (window.gtag) {
        let name = to.name;
        if (to.meta && to.meta.title) {
            name = to.meta.title;
        }
        window.gtag('config', window.ga_id, {
            page_title: name,
            page_path: to.fullPath
        });
    }
});
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');

