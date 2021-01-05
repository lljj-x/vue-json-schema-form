/**
 * Created by Liu.Jun on 2020/5/13 15:52.
 */

import '@/_common/bootstrap.js';
import { createApp } from 'vue';
// import VueRouter from 'VueRouter';
// import elementUI from '@/_common/components/ElementPlus/index.js';

// import routes from './routes';

import App from './App';

import './style.css';

const app = createApp(App);
// app.use(VueRouter);

// Ui
// app.use(elementUI);

app.mount('#app');

// new Vue({
//     router: new VueRouter({
//         mode: 'hash',
//         routes,
//         scrollBehavior() {
//             return { x: 0, y: 0 };
//         }
//     }),
//     render: h => h(App)
// }).$mount('#app');
