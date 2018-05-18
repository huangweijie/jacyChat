<template>
    <div class="searchContainer">
        <div class="searchMes">
            <div class="inputMes">
                <img src="static/img/searchInput.png" alt="">
                <input type="text" placeholder="请输入昵称或者愿望关键字" @input='searchWish' ref='searchMes'>
            </div>
            <p>快速搜索</p>
            <div class="searchType">
                <img alt="" @click='changeWishType(0)' :src='wishType == 0 ? "static/img/somethingClicked.png" : "static/img/somethingClick.png"'>
                <img src="static/img/line.png" alt="" class="searchLine">
                <img alt="" @click='changeWishType(1)' :src='wishType == 1 ? "static/img/timeClicked.png" : "static/img/timeClick.png"'>
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
        props: ['host'],
        data() {
            return {
                wishList: [],
                wishType: -1
            }
        },
        methods: {
            searchWish: function(e, type) {
                let data = {};
                if(!e) {
                    data.type = type;
                }else {
                    this.wishType = -1;
                    if(this.$refs.searchMes.value == '') {
                        this.wishList = [];
                        return;
                    };
                    data.value = this.$refs.searchMes.value;
                }
                http('get', this.host + 'searchWish', data, 'json', (res) => {
                    this.wishList = res.data.wishList;
                }, (err) => {
                    console.log(err);
                })
            },
            changeWishType: function(type) {
                this.wishType = type;
                this.searchWish(null, type);
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
        }
    }
</script>

<style lang='less' scoped>
    .searchContainer {
        .searchMes {
            padding: 0.5rem 0;
            background-color: #fff;
            p {
                margin: 0.5rem;
                color: #5f5f5f;
                font-size: 0.4rem;
            }
            .inputMes {
                margin: 0 auto;
                width: 90%;
                height: 1rem;
                background-color: rgba(0,0,0,0.2);
                border-radius: 5px;
            }
            .inputMes img{
                width: 0.6rem;
                height: 0.6rem;
                margin: 0.2rem 0.4rem;
            }
            .inputMes input {
                border: 0;
                background-color: rgba(0,0,0,0);
                display: inline-block;
                width: 80%;
                font-size: 0.4rem;
                line-height: 1rem;
                height: 1rem;
                vertical-align: top;
            }
            .searchType {
                text-align: center;
            }
            .searchType img{
                height: 0.6rem;
            }
            .searchLine {
                width: 1px;
                margin: 0 0.7rem;
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
    }
</style>