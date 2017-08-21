<template>
	<form class="loginForm">
		<div id="username">
			<span class="username">用户名</span>
			<input type="text">
		</div>
		<div id="password">
			<span class="password">密码</span>
			<input type="password">
		</div>
		<button class="loginBtn" @click="login">登录</button>
	</form>
</template>

<script>
	var http = require('../axios')

	module.exports = {
		props: ['host'],
		created() {
			sessionStorage.page = 'login';
		},
		methods: {
			login: function(e) {
				e.preventDefault();
				var data = {
					username: document.getElementsByTagName('input')[0].value,
					password: document.getElementsByTagName('input')[1].value
				}
				http('post', this.host + 'login', data, 'json', function(res) {
					if(res.data.code == 1) {
						location.hash = '/home'
					}
				}, function(err) {
					console.log(err);
				})
			}
		},
		beforeRouteLeave(to, form, next) {
			document.getElementsByTagName('body')[0].style.background = 'none';
			next()
		}
	}
</script>

<style lang="less">
	body {
		background: url('../assets/login.png') no-repeat;
		background-position: 0 bottom;
		background-size: 100%;
	}
	.loginForm {
		text-align: center;
		position: absolute;
		width: 100%;
		height: 5rem;
		overflow: hidden;
		top: 0;
		bottom: 5rem;
		margin: auto;
		#username {
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
		#password {
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
		.loginBtn {
			width: 2rem;
			font-size: 0.5rem;
			line-height: 1.5;
			background-color: #57e8e1;
			color: #fff;
			margin-top: 0.7rem;
		}
	}
</style>