/**
 * Created by Liu.Jun on 2020/10/24 9:21 下午.
 */

import 'demo-common/bootstrap.js';

import Vue from 'vue';
import elementUI from 'demo-common/components/ElementUi/index.js';
import router from './router';
import App from './App';

// Ui
Vue.use(elementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
