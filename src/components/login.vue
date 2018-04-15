<template>
	<div>
		<form class="loginForm">
			<div id="userId">
				<span class="userId">用户名</span>
				<input type="text" ref="userId">
			</div>
			<div id="password">
				<span class="password">密码</span>
				<input type="password" ref="password">
			</div>
			<div id="repeatPw" v-if="isRegister">
				<span class="repeatPw">确认密码</span>
				<input type="password" ref="repeatPw">
			</div>
			<div id="userName" v-if="isRegister">
				<span class="userName">昵称</span>
				<input type="text" ref="userName">
			</div>
			<button class="loginBtn" @click="login">登录</button>
			<button class="registerBtn" @click="register">注册</button>
		</form>
		<tips :tips='tips' v-if="tipShow"></tips>
	</div>
</template>

<script>
	var http = require('../axios')
	var common = require('../common')
	var tips = require('./tip.vue')
	module.exports = {
		props: ['host'],
		components: {
			tips
		},
		data() {
			return {
				isRegister: false,
				tipShow: false,
				tips: '',
				throttle: true
			}
		},
		created() {
			sessionStorage.page = 'login';
			common.changeHeader(this, {
				hasTitle: true,
				hasAdd: false,
				hasRefresh: true,
			})
		},
		methods: {
			login: function(e) {
				e.preventDefault();
				if(this.isRegister == true) {
					this.isRegister = false;
				}else {
					var data = {
						userId: this.$refs.userId.value,
						password: this.$refs.password.value
					}
					http('post', this.host + 'login', data, 'json', (res) => {
						console.log(res)
						if(res.data.code == 1) {
							sessionStorage.userName = res.data.user;
							sessionStorage.head = res.data.head;
							//触发视图更新
							(this.$parent.$children)[0].userName = sessionStorage.userName;
							(this.$parent.$children)[0].head = sessionStorage.head
							sessionStorage.userId = this.$refs.userId.value;
							location.replace('/#/home')
						}else {
							this.throttle = false;
							this.tipShow = true;
							this.tips = res.data.msg;
						}
					}, function(err) {
						console.log(err);
					})
				}
			},
			register: function(e) {
				e.preventDefault();
				if(this.isRegister == false) {
					this.isRegister = true;
				}else {
					var password = this.$refs.password.value,
						repeatPw = this.$refs.repeatPw.value;
					if(password !== repeatPw && this.throttle) {
						this.throttle = false;
						this.tipShow = true;
						this.tips = 'fail';
					}else if(password === repeatPw) {
						let data = {
							userId: this.$refs.userId.value,
							password: this.$refs.password.value,
							userName: this.$refs.userName.value
						}
						http('post', this.host + 'register', data, 'json', (res) => {
							if(res.data.code == 1) {
								sessionStorage.userName = this.$refs.userName.value;
								//触发视图更新
								(this.$parent.$children)[0].userName = sessionStorage.userName;
								location.replace('/#/home')
							}
						}, function(err) {
							console.log(err)
						})		
					}
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			document.getElementsByTagName('body')[0].style.backgroundImage = "url('http://ww4.sinaimg.cn/large/0060lm7Tgy1fiuutvfnskj30u01hc7wh.jpg')";
			next()
		},
		beforeRouteLeave(to, from, next) {
			document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
			next()
		}
	}
</script>

<style lang="less">
	body {
		background: url('http://ww4.sinaimg.cn/large/0060lm7Tgy1fiuutvfnskj30u01hc7wh.jpg') no-repeat;
		background-position: 0 bottom;
		background-size: 100%;
	}
	.loginForm {
		text-align: center;
		position: absolute;
		width: 100%;
		height: 8rem;
		overflow: hidden;
		top: 0;
		bottom: 0;
		margin: auto;
		#userId {
			margin-bottom: 1rem;
			span {
				display: inline-block;
				width: 2rem;
				font-size: .5rem;
				text-align: justify;
				text-align-last: justify;
				vertical-align: middle;
			}
		}
		#userName {
			margin-top: 1rem;
			span {
				display: inline-block;
				width: 2rem;
				font-size: .5rem;
				text-align: justify;
				text-align-last: justify;
				vertical-align: middle;
			}
		}
		#password {
			margin-bottom: 1rem;
			span {
				display: inline-block;
				width: 2rem;
				font-size: .5rem;
				text-align: justify;
				text-align-last: justify;
				vertical-align: middle;
			}
		}
		#repeatPw {
			margin-bottom: 1rem;
			span {
				display: inline-block;
				width: 2rem;
				font-size: .5rem;
				text-align: justify;
				text-align-last: justify;
				vertical-align: middle;
			}
		}
		input {
			display: inline-block;
			width: 50%;
			font-size: .5rem;
			line-height: .8rem;
			vertical-align: middle;
		}
		.loginBtn, .registerBtn {
			width: 2rem;
			font-size: 0.5rem;
			line-height: 1.5;
			background-color: #57e8e1;
			color: #fff;
			margin: 1rem .3rem;
		}
	}
</style>