<template>
    <div class="homeContainer">
        <div class="banner">
            <img src="static/img/banner.png">
            <div class="banner-text">
                <p>快来和小伙伴</p>
                <p>分享你的愿望吧 !</p>
            </div>
        </div>
        <div class="wishList">
            <div v-for='(item, index) in wishList' :class="[index % 2 == 0 ? 'left' : 'right']">
                <ul>
                    <li>
                        <img :src="item.user|getUserHead" alt="" class="head">
                        <span class="name">{{item.user.userName}}</span>
                        <span class="sex">{{item.user.sex == 1 ? '女' : '男'}}</span>
                        <img src="static/img/eye.png" alt="" class="eye" @click='viewWishDetail(item)'>
                        <div class="line"></div>
                        <div class="wish-text">
                            {{item.wishText}}
                        </div>
                        <img v-if='item.wishImg' :src="item.wishImg" alt="" class="wish-img">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    let http = require('../../axios');
    let common = require('../../common');
    module.exports = {
        data() {
            return {
                wishList: []
            }
        },
        props: ['host'],
        methods: {
            getWishList: function() {
                http('get', this.host + 'getWishList', {}, 'json', (res) => {
                    console.log(res);
                    this.wishList = res.data.wishList;
                }, (err) => {
                    console.log(err);
                })
            },
            viewWishDetail: function(data) {
                this.$router.push({
                    name: 'getWish',
                    params: {
                        wishDetail: data
                    }
                })
            }
        },
        filters: {
            getUserHead(user) {
                return common.getUserHead(user.head, user.sex);
            }
        },
        created: function() {
            this.getWishList();
        }
    }
</script>

<style lang='less' scoped>
    .banner {
        position: relative;
        img{
            width: 100%;
            height: 3.5rem;
            display: block;
        }
        .banner_blur {
            width: 100%;
            height: 4.5rem;
            -webkit-filter: blur(1px);
            -moz-filter: blur(1px);
            -ms-filter: blur(1px);
            -o-filter: blur(1px);
            filter: blur(1px);
        }
        .set {
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            top: 0.3rem;
            right: 0.4rem;
        }
        .user_head {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            position: absolute;
            left: 0;
            right: 0;
            top: 0.5rem;
            bottom: 1.5rem;
            margin: auto;
        }
        .user_mes {
            position: absolute;
            width: 100%;
            top: 3.2rem;
            text-align: center;
        }
        .user_name {
            font-size: 0.4rem;
            border-bottom: 2px solid #ee76c2;
            color: #2b2b2b;
            margin-right: 0.7rem;
            margin-left: 1rem;
        }
        .user_class {
            font-size: 0.3rem;
            border-bottom: 1px solid #ee76c2;
            color: #2a2a2a;
        }
        ul {
            position: absolute;
            top: 3.4rem;
            padding: 0 1rem;
        }
        ul li {
            float: left;
            margin: 0 0.3rem;
        }
        ul li img {
            width: 1rem;
            height: 1rem;
        }
        .banner-text {
            position: absolute;
            top: 0.8rem;
            right: 0.3rem;
            font-size: 0.4rem;
            font-weight: bold;
            color: #7d3232;
        }
    }
    .wishList {
        margin-top: 0.4rem;
        // overflow: auto;
        .left, .right {
            width: 47%;
            display: inline-block;
            margin: 0 2%;
            vertical-align: top;        //左右列表向上对齐
        }
        .right {
            margin-left: 0;
        }
        ul li {
            position: relative;
            padding: 0.3rem;
            border: 1px solid #969696;
            margin-bottom: 4%;
            background-color: #f5f5f5;
        }
        .head {
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 50%;
        }
        .name {
            color: #424242;
            font-size: 0.4rem;
            position: absolute;
            top: 0.65rem;
            left: 1.9rem;
        }
        .sex {
            color: #757575;
            font-size: 0.3rem;
            position: absolute;
            top: 1.2rem;
            left: 1.9rem;
        }
        .center {
            position: absolute;
            width: 3em;
            text-align: center;
            top: 0.3rem;
            right: 0.15rem;
        }
        .eye {
            position: absolute;
            width: 0.6rem;
            top: 0.3rem;
            right: 0.4rem;
        }
        .eyes {
            width: 0.6rem;
            display: block;
            margin: 0 auto;
        }
        .status {
            font-size: 0.2rem;
            color: #ec4b57;
            display: block;
            text-align: center;
        }

        .line {
            width: 100%;
            border-top: 1px solid #969696;
            margin: 0.2rem 0;
        }
        .wish-text {
            font-size: 0.3rem;
            color: #1b1b1b;
        }
        .wish-img {
            width: 100%;
            margin-top: 0.4rem;
            max-height: 4rem;
        }
    }

</style>