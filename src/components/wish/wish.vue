<template>
    <div class="wishContainer">
        <wishHeader v-if='hasHeader'></wishHeader>
        <router-view :host='host'></router-view>
        <wishFooter v-if='hasFooter'></wishFooter> 
    </div>
</template>

<script>
    let wishHeader = require('./header.vue');
    let wishFooter = require('./footer.vue');
    let common = require('../../common');
    module.exports = {
        components: {
            wishHeader,
            wishFooter
        },
        props: ['host'],
        data() {
            return {
                hasHeader: true,
                hasFooter: true
            }
        },
        created: function() {
            common.bus.$on('toggleWishHeader', (isShow) => {
                this.hasHeader = isShow;
            })

            common.bus.$on('toggleWishFooter', (isShow) => {
                this.hasFooter = isShow;
            })
        }
    }
</script>

<style lang='less' scoped>
    
</style>