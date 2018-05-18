<template>
    <div class="footer-container">
        <div v-for="(item, index) in footerList" class="footer-icon" :class="{'selected': item.hasSelect}" :key="index" @click="changePage(index)">
            <router-link :to="{name: item.pageName}">
                <i :class="item.itemClassName"></i><span>{{item.itemName}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: () => {
            return {
                footerList: [{
                    itemName: '聊天',
                    itemClassName: 'icon-chat',
                    hasSelect: true,
                    pageName: 'home'
                }, {
                    itemName: '通讯录',
                    itemClassName: 'icon-contacts',
                    hasSelect: false,
                    pageName: 'contactList'
                }, {
                    itemName: '发现',
                    itemClassName: 'icon-find',
                    hasSelect: false,
                    pageName: 'find'
                }, {
                    itemName: '我',
                    itemClassName: 'icon-personalcenter',
                    hasSelect: false,
                    pageName: 'personal'
                }]
            }
        },

        created() {
            this.$router.beforeEach((to, from, next) => {
                this.footerList.map(function(value, index) {
                    if(value.pageName == to.name){
                        value.hasSelect = true;
                    }else {
                        value.hasSelect = false;
                    }
                })
                next();
            })
        },

        methods: {
            /**
             * 底部导航切换
             * @param  {Number} index 切换后导航索引
             * @return {[type]}       [description]
             */
            changePage: function(index) {
                this.footerList.map(function(value, keyIndex) {
                    if(keyIndex == index){
                        value.hasSelect = true;
                    }else {
                        value.hasSelect = false;
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .footer-container {
        display: flex;
        display: -webkit-box;
        display: flex-box;
        position: fixed;
        width: 100%;
        bottom: 0;
        background-color: #fff;
        .footer-icon {
            width: 25%;
            text-align: center;
            height: 1.3rem;
            i {
                display: block;
                font-size: .7rem;
                // line-height: .4rem;
                color: #666;
            }
            a { 
                display: block;
                margin-top: .1rem;
                color: #000;
            }
            span {
                display: block;
                font-size: .3rem;
            }
            &.selected {
                color: #57c2e8;
                i, a {
                    color: #57c2e8;
                }
            }
        }
    }
</style>