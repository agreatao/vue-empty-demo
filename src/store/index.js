import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import browser from "./browser";

export default new Vuex.Store({
    modules: { browser }
});
