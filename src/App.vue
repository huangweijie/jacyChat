<template>
    <div id="app" v-cloak>
        <appHeader v-if="hasHeader" :headerConfig='headerConfig'></appHeader>
        <div v-if="hasHeader" class="header-space"></div>
        <router-view host="http://localhost:3000/" :socket='socket'></router-view>
        <appFooter v-show="hasFooter"></appFooter>
        <div v-if="hasFooter" class="footer-space"></div>
    </div>
</template>

<script>
    import 'frozenui'
    import appHeader from '@/components/header'
    import appFooter from '@/components/footer'
    import common from './common.js'
    export default {
        name: 'app',
        data: () => {
            return {
                socket: '',
                hasFooter: false,
                hasHeader: true,
                headerConfig: {
                    hasTitle: true,
                    hasRefresh: false,
                    hasAdd: false,
                    hasReturn: false,
                    isContact: false,
                    hasPerMes: false,
                    contactName: ''
                }
            }
        },
        components: {
            appHeader,
            appFooter
        },
        created() {
            //初始化rem
            let windowHeight = window.innerHeight;
            document.documentElement.style.minHeight = windowHeight + 'px';
            function resize() {
                let windowWidth = window.innerWidth;
                document.documentElement.style.fontSize = windowWidth/10 + 'px';
            }
            resize();
            window.onresize = resize;
            document.getElementsByTagName('html')[0].style.minHeight = window.innerHeight + 'px';
            document.getElementsByTagName('body')[0].style.minHeight = window.innerHeight + 'px';

            common.bus.$on('toggleHeader', (isShow) => {
                this.hasHeader = isShow;
            })

            common.bus.$on('toggleFooter', (isShow) => {
                this.hasFooter = isShow;
            })
        }
    }
</script>

<style>
    [v-cloak] {
        display: none;
    }
    * {
        margin: 0;
        padding: 0;
        border: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    .header-space {
        width: 100%;
        height: 1.3rem;
    }
    .footer-space {
        width: 100%;
        height: 1.4666rem;
    }
</style>
