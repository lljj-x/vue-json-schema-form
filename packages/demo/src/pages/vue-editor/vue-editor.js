/**
 * Created by Liu.Jun on 2019/9/29 15:29.
 */

// bootstrap
import '@/_common/bootstrap.js';
import Vue from 'vue';
import elementUI from '@/_common/components/ElementUi/index.js';

import './vue-editor.css';
import router from './router';
import routerGuards from './router/guards';
import App from './App';

// Ui
Vue.use(elementUI);

// 添加路由守卫
routerGuards(router); // 路由守卫

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
