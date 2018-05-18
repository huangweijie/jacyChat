<template>
    <div class="findContainer">
        <div class="friendDy" @click='jumpFriendDy'>
            <!-- <i class="icon-friendDy"></i><span>朋友圈</span> -->
            <img class="friendDyIcon" src='static/img/friendDyIcon.svg'></img><span>朋友圈</span>
        </div>
        <div class="game" @click='jumpGame'>
            <!-- <i class="icon-game"></i><span>游戏</span> -->
            <img class="gameIcon" src='static/img/gameIcon.svg'></img><span>游戏</span>
        </div>
        <div class="wish" @click='jumpWish'>
            <i class="icon-wish"></i><span>许愿墙</span>
            <!-- <img class="wishIcon" src='static/img/wishIcon.svg'></img><span>许愿墙</span> -->
        </div>
    </div>
</template>

<script>
    let common = require('../common.js');
    module.exports = {
        data() {
            return {

            }
        },
        methods: {
            jumpFriendDy: function() {
                this.$router.push('/friendDy');
            },
            jumpGame: function() {
                this.$router.push('/game');
            },
            jumpWish: function() {
                this.$router.push('/wish');
            }
        },
        created() {
            common.changeHeader({
                hasPerMes: true,
                hasAdd: true
            })
        }
    }
</script>

<style lang='less' scoped>
    .findContainer {
        padding-top: .5rem;
        & > div {
            width: 100%;
            height: 1.5rem;
            background: #fff;
            margin-bottom: .5rem;
            font-size: .6rem;
            line-height: 1.5rem;
            padding-left: .5rem;
            &.wish {
                font-size: .65rem;
                .icon-wish {
                    color: #f11c1c;
                }
            }
            & > i {
                vertical-align: middle;
                margin-right: .5rem;
            }
            & > span {
                vertical-align: middle;
                font-size: .5rem;
            }
            img {
                width: .65rem;
                vertical-align: middle;
                margin-right: .5rem;
            }
        }
    }
</style>