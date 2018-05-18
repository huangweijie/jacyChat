<template>
    <div class="messageContainer">
        <ul class="messageList">
            <li v-for='item in messageList'>{{item.mes}}</li>
        </ul>
    </div>
</template>

<script>
    let http = require('../../axios');
    module.exports = {
        props: ['host'],
        data() {
            return {
                messageList: []
            }
        },
        methods: {
            getMessageList: function() {
                http('get', this.host + 'getMessageList', {}, 'json', (res) => {
                    this.messageList = res.data.messageList;
                    console.log(res)
                }, (err) => {
                    console.log(err)
                })
            }
        },
        created: function() {
            this.getMessageList();
        }
    }
</script>

<style lang='less' scoped>
    .messageContainer {
        ul.messageList li {
            width: 80%;
            padding: 0.5rem;
            margin: 0.5rem auto;
            background-color: #fff;
            font-size: 0.44rem;
            color: #5f5f5f;
            border: 0;
        }
    }
</style>