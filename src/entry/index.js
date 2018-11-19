import 'theme/index.css';

import Vue from 'vue';

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);

import router from 'router';
import store from 'store';

import app from 'masters/app';
import 'lib/browser';
import http from 'lib/http';

http.bind(Vue);

new Vue({
    el: '#app',
    router,
    store,
    components: { app },
    template: '<app />'
})