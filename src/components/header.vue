<template>
	<header>
     	<i v-if="hasReturn" class="ui-icon-return return" @click="back"></i>
     	<span v-if="hasTitle" class="title">Jacy Chat</span>
     	<span v-if="isContact" class="contactName">contactName</span>
     	<i v-if="hasRefresh" class="ui-icon-refresh refresh" @click="refresh"></i>
     	<i v-if="hasAdd" class="ui-icon-add add" @click='add'></i>
    </header>
</template>

<script>
	let common = require('../common')
	module.exports = {
		props: ['hasReturn', 'hasTitle', 'isContact', 'hasRefresh', 'hasAdd'],
		methods: {
			back: () => {
				history.go(-1);
			},
			refresh: () => {
				let obj;
				if(sessionStorage.page == 'login') {
					obj = document.getElementsByClassName('loginForm')[0];
					obj.reset();
				}
			},
			add: function() {
				common.bus.$emit('search', true)
			}
		}
	}
</script>

<style scoped lang='less'>
	@heightLine: 1.3rem;
	header {
		display: box;
		display: -webkit-box;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		position: relative;
		width: 100%;
		height: @heightLine;
		background-color: #57c2e8;
		font-size: 0.5rem;
		line-height: @heightLine;
		color: #fff;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 .3rem;
  	}
  	.title {
  		display: box;
		display: -webkit-box;
		-webkit-box-flex: 1;
  	}
  	.return {
  		display: box;
		display: -webkit-box;
		-webkit-box-pack: center;
		margin-left: -.3rem;
  	}
  	.contactName {
  		display: box;
		display: -webkit-box;
		-webkit-box-flex: 1;
		-webkit-box-pack: center;
  	}
	.refresh {
		font-size: 1.1rem;
		display: box;
		display: -webkit-box;
		-webkit-box-pack: center;
	}
	.add {
		font-size: 0.8rem;
		display: box;
		display: -webkit-box;
		-webkit-box-pack: center;
	}
</style>