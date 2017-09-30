<template>
	<transition name="search-contain">
		<div id="search" @click='close' ref='searchContain'>
			<div class="search-mes">
				<i class="ui-icon-search"></i><!--
				--><input type="text" @input="search" ref='input'><!--
				--><i class="ui-icon-close-page" @click='close' ref='closeIcon'></i>
			</div>
			<div class="search-list">
				<ul>
					<li v-for='list in searchList'>
						<i class="ui-icon-personal"></i>
						<span>{{list.userId}}</span>
						<i class="ui-icon-add-people" @click='addFriend(list.userName, list.userId, $event)'></i>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
	let common = require('../common')
	let http = require('../axios') 
	module.exports = {
		props: ['host'],
		data() {
			return {
				searchList: [],
			}
		},
		methods: {
			search: function() {
				if(this.$refs.input.value == '') {
					this.searchList = [];
					return;
				}
				http('get', this.host + 'search', {
					searchMes: this.$refs.input.value,
				}, 'json', (res) => {
					this.searchList = res.data.result;
				}, (err) => {
					console.log(err)
				})
			},
			close: function(e) {
				if(e.target == this.$refs.closeIcon || e.target == this.$refs.searchContain) {
					common.bus.$emit('search', false)
				}
			},
			addFriend: function(userName, userId, e) {
				http('post', this.host + 'addFriend', {
					userName: userName,
					userId: userId
				}, 'json', (res) => {
					e.target.parentNode.style.display = 'none';
					common.bus.$emit('search', false)
					this.updateGroupList({
						userId: userId,
						userName: userName
					});
				}, (err) => {
					console.log(err)
				})
			},
			updateGroupList: function(user) {
				common.bus.$emit('updateGroupList', user);
			}
		}
	}
</script>

<style lang="less">
	.search-contain-enter-active {
		animation: top-enter .2s linear, enter .2s linear .2s;
	}
	.search-contain-leave-active {
		animation: leave .2s linear;
	}
	@keyframes top-enter {
		from {
			top: -1.2rem;
			background-color: rgba(0, 0, 0, 0);
		}
		to {
			top: 0;
			background-color: rgba(0, 0, 0, 0);
		}
	}
	@keyframes enter {
		from {
			background-color: rgba(0, 0, 0, 0);
		}
		to {
			background-color: rgba(0, 0, 0, .5);
		}
	}
	@keyframes leave {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	#search {
		position: fixed;
		background-color: rgba(0, 0, 0, .5);
		width: 100%;
		min-height: 100%;
		top: 0;
		.search-mes {
			height: 1.2rem;
			background-color: #fff;
			input {
				width: 80%;
				height: 100%;
				vertical-align: top;
				font-size: 0.5rem;
				line-height: 1.2rem;
			}
			i {
				display: inline-block;
				width: 10%;
				font-size: 1rem;
				height: 1.2rem;
				line-height: 1.2rem;
				text-align: center;
				vertical-align: top;
				&.ui-icon-close-page {
					font-size: .7rem
				}
			}
		}
		.search-list {
				li {
					height: 1.5rem;
					background-color: #fff;
					border-bottom: 1px solid rgba(0, 0, 0, .5);
					box-sizing: border-box;
					display: flex;
					align-items: center;
					&:first-child {
						border-top: 1px solid rgba(0, 0, 0, .5);
					}
					i {
						margin: 0 .2rem;
						&.ui-icon-personal {
							font-size: .9rem;
						}
						&.ui-icon-add-people {
							font-size: 1rem;
						}
					}
					span {
						flex-grow: 1;
						font-size: .5rem;
					}
				}
		}
	}
</style>