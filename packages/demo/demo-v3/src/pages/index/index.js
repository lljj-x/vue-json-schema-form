/**
 * Created by Liu.Jun on 2020/5/13 15:52.
 */

import 'demo-common/bootstrap.js';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'VueRouter';
import ElementPlus from 'demo-common/components/ElementPlus/index.js';

import routes from './routes';

import App from './App';

import './style.css';

// create router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// create app
const app = createApp(App);

// use router
app.use(router);

// use ui lib
app.use(ElementPlus);

// mount
app.mount('#app');

window.app1 = app;
