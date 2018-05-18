<template>
    <div class="footerContainer">
        <div class="footer-space"></div>
        <footer>
            <div v-for='(item, index) in footerList' :class='item.className' @click='jump(item.pageName)'>
                <img :class="item.className + '_tab'" :src="item.active ? item.activeImg : item.commonImg" alt="" />            
            </div>
        </footer>
    </div>
</template>

<script>
    let common = require('../../common');
    module.exports = {
        data() {
            return {
                footerList: [{
                    active: true,
                    pageName: 'wishHome',
                    className: 'home',
                    commonImg: 'static/img/home.png',
                    activeImg: 'static/img/home_now.png'
                }, {
                    active: false,
                    pageName: 'wishSearch',
                    className: 'search',
                    commonImg: 'static/img/search.png',
                    activeImg: 'static/img/search_now.png'
                }, {
                    active: false,
                    pageName: 'wishEdit',
                    className: 'wish',
                    commonImg: 'static/img/wish.png'
                }, {
                    active: false,
                    pageName: 'wishMessage',
                    className: 'message',
                    commonImg: 'static/img/message.png',
                    activeImg: 'static/img/message_now.png'
                }, {
                    active: false,
                    pageName: 'wishPer',
                    className: 'personal',
                    commonImg: 'static/img/personal.png',
                    activeImg: 'static/img/personal_now.png'
                }]
            }
        },
        methods: {
            jump: function(pageName) {
                this.$router.push({
                    name: pageName
                })
                this.footerList.map(function(value, index) {
                    if(value.pageName == 'wishEdit') {
                        return;
                    }else if(value.pageName == pageName){
                        value.active = true;
                    }else {
                        value.active = false;
                    }
                })
            }
        },
        created: function() {
            this.$router.beforeEach((to, from, next) => {
                this.footerList.map(function(value, index) {
                    if(value.pageName == 'wishEdit') {
                        return;
                    }else if(value.pageName == to.name){
                        value.active = true;
                    }else {
                        value.active = false;
                    }
                })
                next();
            })
        }
    }
</script>

<style lang='less' scoped>
    .footer-space {
        width: 100%;
        height: 1.878rem;
    }
    footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        border-top:  1px solid #969696;
        padding: 0.2rem 0;
        max-width: 700px;
        background-color: #f5f5f5;
        div {
            float: left;
            width: 8%;
            padding: 0 4.5%;
            &:first-child {
                padding-left: 9%;
            }
            &:last-child {
                padding-right: 9%;
            }
            img {
                width: 0.7rem;
                &.home_tab {
                    width: .74rem;
                }
            }
            &:last-child img {
                width: 1.3rem;
            }
        }
    }
</style>