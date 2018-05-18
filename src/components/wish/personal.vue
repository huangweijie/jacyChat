<template>
    <div class="personalContainer">
        <div class="banner">
            <img src="static/img/banner.png" class="banner_blur">
            <img :src="{head: userHead, sex: sex}|getUserHead" alt="" class="user_head">
            <p class="user_mes">
                <span class="user_name">{{userName}}</span>
                <span class="user_class">{{sex}}</span>            
            </p>
        </div>
        <div class="myWishTab">我的愿望</div>
        <div class="wishList">
            <div v-for='(item, index) in wishList' :class="[index % 2 == 0 ? 'left' : 'right']">
                <ul>
                    <li>
                        <img :src="item.user|getUserHead" alt="" class="head">
                        <span class="name">{{item.user.userName}}</span>
                        <span class="sex">{{item.user.sex == 1 ? '女' : '男'}}</span>
                        <div class="center">
                            <img :src="item.wishStatus == 0 ? 'static/img/wished.png' : 'static/img/wishing.png'" alt="" :class="item.wishStatus == 0 ? 'eye' : 'eyes'">
                            <span class="status" v-if='item.wishStatus != 0'>{{item.wishStatus == 1 ? '进行中' : '已完成'}}</span>
                        </div>
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
        props: ['host'],
        data() {
            return {
                wishList: [],
                userHead: sessionStorage.head,
                userName: sessionStorage.userName,
                sex: sessionStorage.sex == 1 ? '女' : '男'
            }
        },
        methods: {
            getMyWishList: function() {
                http('get', this.host + 'getMyWishList', {}, 'json', (res) => {
                    this.wishList = res.data.wishList;
                }, (err) => {
                    console.log(err);
                })
            }
        },
        filters: {
            getUserHead(user) {
                return common.getUserHead(user.head, user.sex);
            }
        },
        created: function() {
            this.getMyWishList();
        }
    }
</script>

<style lang='less' scoped>
    .personalContainer {
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
        }
        .myWishTab {
            text-align: center;
            font-size: 0.5rem;
            box-shadow: 1px 1px 5px 1px #9c9c9c;
            background-color: #fff;
            height: 1.3rem;
            line-height: 1.3rem;
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
                display: inline-block;
                color: #424242;
                font-size: 0.4rem;
                position: absolute;
                top: 0.65rem;
                left: 1.9rem;
                max-width: 1.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
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
                width: 0.5rem;
                vertical-align: top;
            }
            .eyes {
                width: 0.5rem;
                display: block;
                margin: 0 auto;
            }
            .status {
                font-size: 0.1rem;
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
    }
</style>