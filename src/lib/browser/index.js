import store from 'store';
import addEventListener from 'add-dom-event-listener';

var browsers = (function(window, { documentElement, body }) {
    // 节流函数
    function throttle(func, wait, mustRun) {
        var timeout,
            startTime = new Date();

        return function() {
            var context = this,
                args = arguments,
                curTime = new Date();

            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if(curTime - startTime >= mustRun){
                func.apply(context, args);
                startTime = curTime;
            }
            else{
                // 没达到触发间隔，重新设定定时器
                timeout = setTimeout(func, wait);
            }
        };
    };

    function onResize() {
        var width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
        var height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
        store.dispatch('browserResize', { width, height })
    }

    function onScroll() {
        var scrollTop = window.scrollY || documentElement.scrollTop || body.scrollTop;
        store.dispatch("browserScroll", { scrollTop })
    }

    addEventListener(window, 'resize', throttle(onResize, 100, 500))
})(window, document);

export default browsers;
