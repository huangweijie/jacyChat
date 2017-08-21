<template>
	<header>
     	<span>Jacy Chat</span>
     	<div class="ui-icon-refresh refresh" @click="refresh"></div>
     	<div class="ui-icon-add add"></div>
     	<div class="box box-shadow"></div>
    </header>
</template>

<script>
	module.exports = {
		methods: {
			refresh: function() {
				let obj;
				if(sessionStorage.page == 'login') {
					obj = document.getElementsByClassName('loginForm')[0];
					obj.reset();
				}
			}
		}
	}
</script>

<style scoped lang='less'>
	@heightLine: 1.3rem;
	header {
		position: relative;
		width: 100%;
		height: @heightLine;
		background-color: #57c2e8;
		font-size: 0.5rem;
		line-height: @heightLine;
		color: #fff;
		padding-left: 0.2rem;
		overflow: hidden;
		box-sizing: border-box;
  	}
	.refresh {
		position: absolute;
		top: 0;
		right: 1.5rem;
		font-size: 1.1rem;
		line-height: @heightLine;
	}
	.add {
		position: absolute;
		top: 0;
		right: 0.5rem;
		font-size: 0.8rem;
		line-height: @heightLine;
	}
</style>