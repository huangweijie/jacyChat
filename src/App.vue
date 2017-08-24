<template>
    <div id="app">
        <appHeader :hasTitle='hasTitle' :hasRefresh='hasRefresh' :hasAdd='hasAdd' :hasReturn='hasReturn' :isContact='isContact'></appHeader>
        <router-view host="http://10.100.147.65:3000/"></router-view>
    </div>
</template>

<script src="../static/js/frozen.js"></script>
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
                isContact: false
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
