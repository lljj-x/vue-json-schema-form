/**
 * Created by Liu.Jun on 2020/5/13 15:52.
 */

import Vue from 'vue';
import VueRouter from 'VueRouter';
import elementUI from 'ELEMENT';

import routes from './routes';

import App from './App';

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
