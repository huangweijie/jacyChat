<template>
    <div class="gameContainer">
        <div class="game" @click='jumpLoverGame'>
            <img class="loverGameIcon" src='static/img/loverGame.svg'></img><span>h5游戏</span>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['host'],
        data() {
            return {

            }
        },
        methods: {
            jumpLoverGame() {
                if(sessionStorage.sex == '1') {
                    location.href = 'http://192.168.1.182:8080/static/game/loverGame/index.html';
                }else {
                    location.href = 'http://192.168.1.182:8080/static/game/loverGame/man.html';
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .gameContainer {
        padding-top: .5rem;
        & > div {
            width: 100%;
            height: 1.5rem;
            background: #fff;
            margin-bottom: .5rem;
            font-size: .6rem;
            line-height: 1.5rem;
            padding-left: .5rem;
            & > span {
                vertical-align: middle;
                font-size: .5rem;
            }
            img {
                width: .8rem;
                vertical-align: middle;
                margin-right: .3rem;
            }
        }
    }
</style>