<template>
    <div class="home">
        {{msg}} home page
        <div>{{temp && temp.a}}  {{temp && temp.b}}</div>
    </div>
</template>
<script>
    export default {
        name: "home",
        data() {
            return {
                msg: "welcome",
                temp: null
            };
        },
        created() {
            Promise.all([this.$http.get("/api/test.do")])
                .then(([result]) => {
                    this.temp = result.data;
                })
                .catch(e => {
                    console.log(e);
                });
            this.$http
                .get("/api/test2.do")
                .then(result => {
                    console.log(result);
                })
                .catch(e => {
                    this.msg = e.message;
                    console.log(e);
                });
            this.$http
                .get("/api/test3.do")
                .then(result => {
                    console.log(result);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };
</script>
<style lang="less">
    .home {
        color: red;
        background: url("~images/banner.jpg") no-repeat;
        height: 845px;
    }
</style>
