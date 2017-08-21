<template>
	<div class="container ui-selector-content">
		<ul class="groupList">
			<li v-for="list in groupList" class="ui-selector-item" v-cloak>
				<h3 class="ui-border-b" @click="toggleList">
					{{list.name}}
				</h3>
				<ul class="ui-list ui-border-b">
					<li class="ui-list-info ui-border-t" v-for="contactList in list.contactList" >
						<router-link :to="{name: 'contact', params: {userId: userId, contactId: contactList.contactId}}">
							<i class="ui-icon-personal"></i>{{contactList.name}}
						</router-link>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	var http = require('../axios')
	module.exports = {
		props: ['host'],
		data() {
			return {
				groupList: [
					{
						name: '最近联系人',
						contactList: [
							{
								name:'ge姐姐',
								contactId: '123'
							}, {
								name:'龙妈',
								contactId: '456'
							}, {
								name:'卡丽熙',
								contactId: '789'
							}, 
						]
					},{
						name: '我的好友',
						contactList: [
							{
								name:'gejiejie',
								contactId: '135'
							}
						]
					},{
						name: '陌生人',
						contactList: [
							{
								name:'gesister',
								contactId: '246'
							}
						]
					},
				],
				isClosing: false,
				fontSize: parseFloat(document.getElementsByTagName('html')[0].style.fontSize),
				userId: '123'
			}
		},
		methods: {
			toggleList: function(e) {
				var currentTarget = e.currentTarget;
				var contactList = currentTarget.nextSibling.nextSibling;
				var display = window.getComputedStyle(contactList, null).getPropertyValue('display');
				var height = window.getComputedStyle(contactList, null).getPropertyValue('height');
				var totalHeight = contactList.childNodes.length * 1.5 * this.fontSize + 'px';
				if(height == '0px' || this.isClosing) {
					this.isClosing = false;
					contactList.style.height = totalHeight;
					currentTarget.parentNode.classList.add('active');
				}else {
					this.isClosing = true;
					contactList.style.height = '0';
					currentTarget.parentNode.classList.remove('active');
				}
			}
		},
		created() {
			sessionStorage.page = 'home';
			http('get', this.host + 'getGroupList', {}, 'json', function(res) {
				console.log(res);
			}, function(err) {
				console.log(err);
			})
		}
	}
</script>

<style lang="less" scoped>
	[v-cloak] {
		display: none;
	}
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
		li:last-child {
			border-bottom: 0;
		}
	}
	.ui-selector-item {
		font-size: .5rem;
		line-height: 1.5rem;
	}
</style>