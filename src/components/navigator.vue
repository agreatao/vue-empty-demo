<template>
    <nav class="nav">
        <img v-lazy="logo">
        <router-link to="/home">home</router-link>
        <router-link to="/user">user</router-link>
        <img v-lazy="temp">
    </nav>
</template>
<script>
    import logo from 'images/duck.jpg';
    import loading from 'images/loading.gif';
    import error from 'images/image-error.png';
    
    export default {
        name: "navigator",
        data() {
            return {
                logo: {
                    src: logo,
                    error,
                    loading
                },
                temp: {
                    src: 'http://www.baidu.com',
                    error,
                    loading
                }
            }
        }
    };
</script>
<style lang="less">
    img {
        width: 64px;
        height: 64px;
    }
</style>
