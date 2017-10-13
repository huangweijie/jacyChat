<template>
    <div id="app" v-cloak>
        <appHeader :hasTitle='hasTitle' :hasRefresh='hasRefresh' :hasAdd='hasAdd' :hasReturn='hasReturn' :isContact='isContact' :hasPerMes='hasPerMes' :contactName='contactName'></appHeader>
        <router-view host="http://localhost:3000/" :socket='socket'></router-view>
    </div>
</template>

<script>
    import 'frozenui'
    import appHeader from '@/components/header'
    import common from './common.js'
    export default {
        name: 'app',
        data: () => {
            return {
                hasTitle: true,
                hasRefresh: true,
                hasAdd: false,
                hasReturn: false,
                isContact: false,
                hasPerMes: false,
                contactName: '',
                socket: ''
            }
        },
        components: {
            appHeader,
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
</style>
