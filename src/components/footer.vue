<template>
    <div class="footer-container">
        <div v-for="(item, index) in footerList" class="footer-icon" :class="{'selected': item.hasSelect}" :key="index" @click="changePage(index)">
            <i :class="item.itemClassName"></i>{{item.itemName}}
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
                    hasSelect: true
                }, {
                    itemName: '通讯录',
                    itemClassName: 'icon-contacts',
                    hasSelect: false
                }, {
                    itemName: '朋友圈',
                    itemClassName: 'icon-friends',
                    hasSelect: false
                }, {
                    itemName: '我',
                    itemClassName: 'icon-personalcenter',
                    hasSelect: false
                }]
            }
        },

        created() {
            this.footerList.forEach((value, index) => {
                console.log(this, value, index)
                if(value.hasSelect) {
                    this.preIndex = index;
                }
            })
        },

        methods: {
            /**
             * 底部导航切换
             * @param  {Number} index 切换后导航索引
             * @return {[type]}       [description]
             */
            changePage: function(index) {
                let preIndex = this.preIndex;
                if(preIndex != index) {
                    this.footerList[preIndex].hasSelect = false;
                    this.footerList[index].hasSelect = true;
                    this.preIndex = index;
                }
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
            i {
                display: block;
                font-size: .85rem;
                line-height: .85rem;
                color: #666;
            }
            &.selected {
                color: #57c2e8;
                i {
                    color: #57c2e8;
                }
            }
        }
    }
</style>