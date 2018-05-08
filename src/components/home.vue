<template>
	<div class="container ui-selector-content">
	<ul class="ui-list ui-border-b">
		<li class="ui-list-info ui-border-t" v-for="item in chatList" >
			<router-link :to="{name: 'contact', params: {
                    contactId: userId == item.from ? item.to : item.from, 
                    contactName: userId == item.from ? item.toName : item.fromName, 
                    head: userId == item.from ? item.toHead : item.fromHead
                }}">
                <div class="userLeft">
				    <i :class="{'ui-icon-personal': item.toHead == 0, 'ui-icon-femail': item.toHead == 1}"></i>
                </div>
                <div class="userRight">
                    <p class="userName">{{userId == item.from ? item.toName : item.fromName}}</p>
                    <p class="chatMes">{{item | formatRecentMes}}</p>
                </div>
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
				chatList: [],
				isClosing: false,
				fontSize: parseFloat(document.documentElement.style.fontSize),
                userId: sessionStorage.userId,
				head: sessionStorage.head,
				searchShow: false
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
				http('get', this.host + 'getChatList', {
					token: localStorage.access_token
				}, 'json', (res) => {
                    console.log(res)
					this.chatList = res.data.chatList;
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
			this.$parent.hasFooter = true;
		},
        filters: {
            formatRecentMes: function(item) {
                if(item.mes == null) {
                    return '';
                }
                if(item.from == sessionStorage.userId) {
                    return '我 : ' + item.mes;
                }else {
                    return item.to + ': ' +item.mes;
                }
            }
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
            font-size: 0;
            a {
                display: block;
                color: #2c3e50;
                width: 100%;
                height: 100%;
                padding-left: .3rem;
                i {
                    display: inline-block;
                    margin-right: 0.1rem;
                    font-size: 1rem;
                    line-height: 1.5rem;
                }
            }
            .userLeft, .userRight {
                height: 100%;
                display: inline-block;
                vertical-align: top;
                line-height: 1;
            }
            .userName {
                box-sizing: border-box;
                font-size: .5rem;
                height: .9rem;
                padding-top: .3rem;
                vertical-align: bottom;
            }
            .chatMes {
                font-size: .3rem;
                height: .5rem;
                color: #999;
            }
        }
        li:last-child {
            border-bottom: 0;
        }
    }
</style>