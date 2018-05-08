<template>
    <div class="friendDyContent">
        <div class="headerImg">
            <img src="https://images.pexels.com/photos/1019771/pexels-photo-1019771.jpeg?auto=compress&cs=tinysrgb&h=1334&w=750" alt="" />
        </div>
        <div class="userMes">
            <div class="userName">{{userName}}</div>
            <div class="head">
                <img :src="head" alt="" />
            </div>
        </div>
        <div class="friendDyList">
            
        </div>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                userName: sessionStorage.userName,
                head: sessionStorage.head
            }
        },
        created() {
            
        }
    }
</script>

<style lang='less' scoped>
    .friendDyContent {
        .headerImg {
            width: 100%;
            height: 7rem;
            overflow: hidden;
            position: relative;
            img {
                width: 100%;
                min-height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
            }
        }
        .userMes {

        }
    }
</style>