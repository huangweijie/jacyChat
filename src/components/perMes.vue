<template>
	<section class="perMes">
		<i class="close" @click="close">X</i>
		<i :class="[{'ui-icon-personal': headProp == 0, 'ui-icon-female': headProp == 1}, 'userHead']" @click="changeHead" ref="userhead"></i>
		<input class="userName" :value="userName" :disabled="!isSelf" ref='userName'>
		<button class="saveBtn ui-btn" @click="save">保存</button>
	</section>
</template>

<script>
	let common = require('../common.js')
	let http = require('../axios.js')
	module.exports = {
		props: ['userName', 'isSelf', 'host', 'headProp'],
		data() {
			return {
				head: 0
			}
		},
		methods: {
			close() {
				common.bus.$emit('perMes', false)
			},
			changeHead() {
				var head = this.$refs.userhead;
				if(this.isSelf) {
					if(head.classList.contains('ui-icon-personal')) {
						head.classList = '';
						head.classList.add('ui-icon-female');
						head.classList.add('userHead');
						this.head = 1;
					}else {
						head.classList = '';
						head.classList.add('ui-icon-personal');
						head.classList.add('userHead');
						this.head = 0;
					}
				}
			},
			save() {
				http('post', this.host + 'changePerMes', {
					head: this.head,
					userName: this.$refs.userName.value
				}, 'json', (res) => {
					sessionStorage.userName = this.$refs.userName.value;
					sessionStorage.head = this.head;
					//触发头部更新
					(this.$parent.$parent.$children)[0].userName = sessionStorage.userName;
					(this.$parent.$parent.$children)[0].head = sessionStorage.head;
					this.$parent.userName = sessionStorage.userName;
					this.$parent.head = sessionStorage.head;
				}, (err) => {
					console.log(err);
				})
			}
		},
		created() {
			this.head = sessionStorage.head;
		},
		mounted() {
			if(this.$refs.userhead.classList.contains('ui-icon-personal')) {
				this.head = 0;
			}else {
				this.head = 1;
			}
		}
	}
</script>

<style lang="less" scoped>
	.perMes {
		display: box;
		display: -webkit-box;
		box-pack: center;
		-webkit-box-pack: center;
		box-align: center;
		-webkit-box-align: center;
		box-orient: vertical;
		-webkit-box-orient: vertical;
		position: absolute;
		width: 70%;
		height: 7rem;
		left: 0;
		right : 0;
		top: 0;
		bottom: 4rem;
		margin: auto;
		background-color: #fff;
		border: 1px solid #666;
		border-radius: 10%;
		.userHead {
			font-size: 2rem;
			margin-bottom: .5rem;
			width: 2rem;
			height: 2rem;
			background: #fff;
			border: 1px solid #666;
			border-radius: 50%;
			line-height: 2rem;
		}
		.userName {
			display: block;
			margin-bottom: .5rem;
			background: transparent;
			text-align: center;
			color: #333;
			border: 1px solid #999;
			border-radius: 10px;
			width: 40%;
			font-size: .4rem;
			height: .8rem;
			line-height: .8rem;
			padding: 0 .3rem;
			box-sizing: border-box;
		}
		.saveBtn {
			// background: #57c2e8;
			// color: #fff;
			// border-radius: 5px;
			// width: 2rem;
			// height: .8rem;
			// line-height: .8rem;
			// font-size: .4rem;
		}
		.close {
			font-size: .5rem;
			position: absolute;
			top: .2rem;
			right: .3rem;
		}
	}
</style>