<template>
    <header>
        <h1>{{title}}</h1>
        <img v-if='hasBack' src="static/img/back.png" alt="" class="back" @click='back'>
        <div class="h1-space"></div>
    </header>
</template>

<script>
    let common = require('../../common');
    module.exports = {
        data() {
            return {
                title: '首页',
                hasBack: false
            }
        },
        methods: {
            back: function() {
                this.$router.go(-1);
            }
        },
        created: function() {
            common.bus.$on('changeWishHeader', (config) => {
                for(let key in config) {
                    this[key] = config[key];
                }
            })
        }
    }
</script>

<style lang='less' scoped>
    header h1 {
        position: fixed;
        width: 100%;
        max-width: 700px;
        font-size: 0.5rem;
        line-height: 1.4rem;
        height: 1.4rem;
        background-color: #ee76c2;
        text-align: center;
        color: #fff;
        z-index: 99;
    } 
    img {
        outline: none;
    }
    .h1-space {
        width: 100%;
        height: 1.4rem;
    }
    .back {
        position: fixed;
        z-index: 99;
        width: 0.4rem;
        margin-top: 0.5rem;
        margin-left: 0.6rem;
    }
</style>