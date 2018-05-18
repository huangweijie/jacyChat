<template>
    <div class="getWishContainer">
        <img :src="wishDetail.user|getUserHead" class="getWishHead" />
        <p class="getWishText">{{wishDetail.wishText}}</p>
        <img :src="wishDetail.wishImg" class="getWishImg" />
        <div class="wishtype getWishType">
            愿望类型
        </div>
        <div class="getWish_Type">
            <img :src="wishDetail.wishType == 0 ? 'static/img/something.png' : 'static/img/time.png'" class="getWishTypeImg" />
            <p>{{wishDetail.wishType == 0 ? '实物类' : '耗时类'}}</p>
        </div>
        <div class="wish-per-mes getWishPer">
            个人信息
        </div>
        <div class="wish-user-mes getWishUser">
            <span class="wish-user-name getWish_name">{{wishDetail.user.userName}}</span><!--
            --><span class="wish-user-sex getWish_sex">{{wishDetail.user.sex == 1 ? '女' : '男'}}</span>
        </div>
        <footer class="wish-footer" @click='getWish'>
            <h1 class="getWish">领取愿望</h1>
        </footer>
    </div>
</template>

<script>
    let http = require('../../axios');
    let common = require('../../common');
    module.exports = {
        data() {
            return {
                wishList: [],
                wishDetail: ''
            }
        },
        props: ['host'],
        methods: {
            getWishList: function() {
                http('get', this.host + 'getWishList', {}, 'json', (res) => {
                    this.wishList = res.data.wishList;
                }, (err) => {
                    console.log(err);
                })
            },
            getWish: function() {
                if(this.wishDetail) {
                    http('post', this.host + 'getWish', {
                        wish: this.wishDetail._id
                    }, 'json', (res) => {
                        console.log(res);
                        this.$router.push({
                            name: 'wishHome'
                        })
                    }, (err) => {
                        console.log(err)
                    })
                }else {
                    return;
                }
            }
        },
        filters: {
            getUserHead(user) {
                return common.getUserHead(user.head, user.sex);
            }
        },
        created: function() {
            this.wishDetail = this.$route.params.wishDetail;
            console.log(this.wishDetail)
        }
    }
</script>

<style lang='less' scoped>
    .getWishContainer {
        position: absolute;
        width: 100%;
        max-width: 700px;
        // min-height: 100%;
        background-color: #fff;
        text-align: center;
        margin-top: 0;
        .getWishType, .getWishPer {
            background-color: #f0f0f0;
        }
        .getWishType {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 0.4rem;
            box-shadow: 1px 1px 5px 1px #9c9c9c;
            height: 1rem;
            line-height: 1rem;
            color: #757575;
            clear: both;
        }
        .getWishHead {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            margin: 0.5rem 0;
        }
        .getWishImg {
            max-width: 6rem;
            max-height: 6rem;
            margin: 0.5rem 0;
        }
        .getWishTypeImg {
            width: 0.7rem;
            margin: 0.7rem 0 0.1rem 0;
        }
        .getWishPer {
            margin-top: 0.7rem;
            text-align: center;
            font-size: 0.4rem;
            box-shadow: 1px 1px 5px 1px #9c9c9c;
            height: 1rem;
            line-height: 1rem;
            color: #757575;
            clear: both;
        }
        .getWishUser {
            padding: 0;
            margin-bottom: 2rem;
        }
        .wish-user-mes {
            position: relative;
            padding-top: 0.5rem;
            text-align: center;
            span {
                display: inline-block;
                margin-top: 0.5rem;
                width: 45%;
                font-size: 0.4rem;
            }
        }
        .wish-user-name, .wish-user-class {
            margin-right: 2.5%;
            text-align: right;
        }
        .wish-user-sex, .wish-user-tel {
            margin-left: 2.5%;
            text-align: left;
        }

        .wish-footer {
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
            border: 0;
            padding: 0;
            bottom: 0;
        }
    }
</style>