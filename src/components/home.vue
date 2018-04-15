<template>
	<div class="container ui-selector-content">
		<ul class="groupList">
			<li v-for="list in groupList" class="ui-selector-item" :class="{active: list.groupStatus}">
				<h3 class="ui-border-b" @click="toggleList">
					{{list.groupName}}
				</h3>
				<ul class="ui-list ui-border-b" :ref="list.groupName">
					<li class="ui-list-info ui-border-t" v-for="contactList in list.groupList" >
						<router-link :to="{name: 'contact', params: {userName: userName, contactId: contactList.contactId, contactName: contactList.name, head: contactList.head}}">
							<i :class="{'ui-icon-personal': contactList.head == 0, 'ui-icon-femail': contactList.head == 1}"></i>{{contactList.name}}
						</router-link>
					</li>
				</ul>
			</li>
		</ul>
		<search v-if='searchShow' :host='host'></search>
		<permes v-if='perMes' :userName='userName' isSelf='true' :host='host' :headProp='head'></permes>
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
			search,
			permes
		},
		data: () => {
			return {
				groupList: [],
				isClosing: false,
				fontSize: parseFloat(document.documentElement.style.fontSize),
				userName: sessionStorage.userName,
				head: sessionStorage.head,
				searchShow: false,
				perMes: false,
			}
		},
		methods: {
			toggleList: function(e) {
				let currentTarget = e.currentTarget;
				let contactList = currentTarget.nextSibling.nextSibling;
				let display = window.getComputedStyle(contactList, null).getPropertyValue('display');
				let height = window.getComputedStyle(contactList, null).getPropertyValue('height');
				let totalHeight = contactList.childNodes.length * 1.5 * this.fontSize + 'px';
				if(contactList.childNodes.length == 0) {
					let classList = currentTarget.parentNode.classList
					classList.contains('active') ? classList.remove('active') : classList.add('active')
					return
				}
				if(height == '0px' || this.isClosing) {
					this.isClosing = false;
					contactList.style.height = totalHeight;
					currentTarget.parentNode.classList.add('active');
				}else {
					this.isClosing = true;
					contactList.style.height = '0';
					currentTarget.parentNode.classList.remove('active');
				}
			},
			bindEvent: function() {
				common.changeHeader(this, {
					hasAdd: true,
					hasRefresh: true,
					hasPerMes: true,
				})
				common.bus.$on('search', (data) => {
					this.searchShow = data;
				})
				common.bus.$on('updateGroupList', (user) => {
					this.groupList.forEach((value, index) => {
						if(value.groupName == '我的好友') {
							value.groupList.push({
								contactId: user.userId,
								name: user.userName,
								head: user.head
							})
						}
					})
					let updateGroup = (this.$refs)['我的好友'][0];
					if(updateGroup) {
						if(!updateGroup.parentNode.classList.contains('active')) {
							updateGroup.parentNode.firstChild.click();
						}
						updateGroup.style.height = parseFloat(updateGroup.style.height) + 1.5 * this.fontSize + 'px';
					}
				})
				common.bus.$on('perMes', (data) => {
					this.perMes = data;
				})
			},
			initGroupList: function() {
				http('get', this.host + 'getGroupList', {
					token: localStorage.access_token
				}, 'json', (res) => {
					this.groupList = res.data.grouplist;
					this.$nextTick(() => {
						for(let name in this.$refs) {
							if(this.$refs[name][0].classList.contains('ui-list')) {
								this.$refs[name][0].style.height = window.getComputedStyle(this.$refs[name][0], null).getPropertyValue('height');
							}
						}
					})
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
		}
	}
</script>

<style lang="less" scoped>
	h3 {
		font-size: .5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		background-image: none;
	}
	.ui-selector-item {
		border-bottom: 1px solid rgba(0, 0, 0, .2);
		.ui-border-b:before {
			width: 0;
			height: 0;
			border-left: 0.15rem solid;
			border-top: 0.1rem solid transparent;
			border-bottom: 0.1rem solid transparent;
			top: 0;
			bottom: 0;
			margin: auto;
		}
		&.active .ui-list {
			height: auto;
		}
	}
	.ui-list {
		display: block;
		height: 0;
		overflow: hidden;
		transition: height 1s;
		-webkit-transition: height 1s, display 1s;
		background-image: none;
		li.ui-border-t {
			height: 1.5rem;
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
				padding-left: 50px;
				i {
					display: inline-block;
					margin-right: 0.1rem;
				}
			}
		}
		li:first-child {
			border-top: 1px solid rgba(0, 0, 0, .1);
		}
		li:last-child {
			border-bottom: 0;
		}
	}
	.ui-selector-item {
		font-size: .5rem;
		line-height: 1.5rem;
	}
	.ui-icon-personal {
		font-size: 1rem;
		vertical-align: middle;
	}
</style>