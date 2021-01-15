/**
 * Created by Liu.Jun on 2020/5/13 15:52.
 */

import 'demo-common/bootstrap.js';
import Vue from 'vue';
import VueRouter from 'VueRouter';
import elementUI from 'demo-common/components/ElementUi/index.js';

import routes from './routes';

import App from './App';

import './style.css';

Vue.use(VueRouter);

// Ui
Vue.use(elementUI);

new Vue({
    router: new VueRouter({
        mode: 'hash',
        routes,
        scrollBehavior() {
            return { x: 0, y: 0 };
        }
    }),
    render: h => h(App)
}).$mount('#app');
