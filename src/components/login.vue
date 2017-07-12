<template>
	<form action="login" class="loginForm">
		<p class="username">用户名:</p>
		<input type="text">
		<p class="password">密码:</p>
		<input type="password">
	</form>
</template>

<script>

</script>

<style lang="less">
	body {
		background: url('../assets/login.png') no-repeat;
		background-position: 0 bottom;
		background-size: 100%;
	}
	.loginForm {
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-orient: vertical;
		.username {
			-webkit-box-flex: 2;		
		}
		.password {
			// display: -webkit-box;
			-webkit-box-flex: 2;
		}
		input {
			// display: -webkit-box;
			-webkit-box-flex: 2;
		}
	}
</style>