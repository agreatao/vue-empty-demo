var explorer = { type: 'unkown', version: -1 };
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? (explorer = { type: 'ie', version: s[1] }) :
    (s = ua.match(/firefox\/([\d.]+)/)) ? (explorer = { type: 'firefox', version: s[1] }) :
        (s = ua.match(/chrome\/([\d.]+)/)) ? (explorer = { type: 'chrome', version: s[1] }) :
            (s = ua.match(/opera.([\d.]+)/)) ? (explorer = { type: 'opera', version: s[1] }) :
                (s = ua.match(/version\/([\d.]+).*safari/)) ? (explorer = { type: 'safari', version: s[1] }) : 0;

var { body, documentElement } = document;
var browser_width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
var browser_height = window.innerHeight || documentElement.clientHeight || body.clientHeight;

module.exports = {
    state: {
        ...explorer,
        width: browser_width,
        height: browser_height,
        scrollTop: 0
    },
    mutations: {
        browserResize (state, payload) {
            state.width = payload.width;
            state.height = payload.height;
        },
        browserScroll (state, payload) {
            state.scrollTop = payload.scrollTop;
        }
    },
    actions: {
        browserResize ({ state, commit }, payload) {
            commit('browserResize', payload)
        },
        browserScroll ({ state }, payload) {
            commit('browserScroll', payload)
        }
    },
    getters: {

    }
}