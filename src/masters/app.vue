<template>
    <div id="app" :style="{width: browser.width + 'px', height: browser.height + 'px' }">
        <navigator />
        <router-view />
    </div>
</template>
<script>
    import navigator from 'components/navigator';
    import { mapState } from 'vuex';
    export default {
        name: 'app',
        components:{
            navigator
        },
        computed: {
            ...mapState({
                browser: state => state.browser
            })
        }
    }
</script>
<style lang="less" scoped>
    #app {
        padding-top: 10px;
    }
</style>