<template>
    <div class="container ui-selector-content">
    <ul class="ui-list ui-border-b">
        <li class="ui-list-info ui-border-t" v-for="item in contactList" >
            <router-link :to="{name: 'contact', params: {userName: userName, contactId: item.contactId, contactName: item.name, head: item.head}}">
                <i :class="{'ui-icon-personal': item.head == 0, 'ui-icon-femail': item.head == 1}"></i><span class="contactName">{{item.name}}</span>
            </router-link>
        </li>
    </ul>
        <search v-if='searchShow' :host='host'></search>
    </div>
</template>

<script>
    let http = require('../axios')
    let common = require('../common')
    let search = require('./search.vue')
    let permes = require('./perMes.vue')
    let io = require('socket.io-client')
    module.exports = {
        props: ['host'],
        components: {
            search
        },
        data: () => {
            return {
                contactList: [],
                isClosing: false,
                fontSize: parseFloat(document.documentElement.style.fontSize),
                userName: sessionStorage.userName,
                head: sessionStorage.head,
                searchShow: false,
                perMes: false,
            }
        },
        methods: {
            bindEvent: function() {
                common.changeHeader(this, {
                    hasAdd: true,
                    hasRefresh: true,
                    hasPerMes: true,
                })
                common.bus.$on('search', (data) => {
                    this.searchShow = data;
                })
            },
            initGroupList: function() {
                http('get', this.host + 'getContactList', {
                    token: localStorage.access_token
                }, 'json', (res) => {
                    this.contactList = res.data.contactList && res.data.contactList.groupList;
                    console.log(this.contactList)
                }, (err) => {
                    console.log(err);
                })
            }
        },
        created() {
            sessionStorage.page = 'home';
            this.bindEvent();
            this.initGroupList();
            this.$parent.socket = io(this.host);
            this.$parent.socket.emit('message', sessionStorage.userId);

            console.log('contactList')
            this.$parent.hasFooter = true;
        }
    }
</script>

<style lang="less" scoped>
    .ui-list {
        display: block;
        // height: 0;
        overflow: hidden;
        transition: height 1s;
        -webkit-transition: height 1s, display 1s;
        background-image: none;
        li.ui-border-t {
            height: 1.5rem;
            line-height: 1.5rem;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-image: none;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            a {
                display: block;
                color: #2c3e50;
                width: 100%;
                height: 100%;
                padding-left: .5rem;
                i {
                    display: inline-block;
                    margin-right: 0.1rem;
                    font-size: .85rem;
                    line-height: .85rem;
                    vertical-align: middle;
                }
            }
        }
        li:last-child {
            border-bottom: 0;
        }
    }
</style>