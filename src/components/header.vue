<template>
	<header>
     	<i v-if="hasReturn" class="ui-icon-return return" @click="back"></i>
     	<span v-if="hasTitle" class="title">Jacy Chat</span>
     	<div v-if="hasPerMes" class="perMes" @click='changePerMes($event)'>
     		<i class="ui-icon-personal user-head"></i>
     		<span class="user-name">{{userId}}</span>
     	</div>
     	<span v-if="isContact" class="contactName">{{contactName}}</span>
     	<i v-if="hasRefresh" class="ui-icon-refresh refresh" @click="refresh"></i>
     	<i v-if="hasAdd" class="ui-icon-add add" @click='add'></i>
    </header>
</template>

<script>
	let common = require('../common')
	module.exports = {
		props: ['hasReturn', 'hasTitle', 'isContact', 'hasRefresh', 'hasAdd', 'hasPerMes', 'contactName'],
		data() {
			return {
				userId: sessionStorage.userId
			}
		},
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
			add: () => {
				common.bus.$emit('search', true)
			},
			changePerMes: (e) => {
				if(e.target.tagName.toLowerCase() != 'div') {
					
				}
			}
		}
	}
</script>

<style lang="less" scoped>
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
		font-size: .5rem;
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
	.perMes {
		display: box;
		display: -webkit-box;
		-webkit-box-flex: 1;
		-webkit-box-align: center;
		.user-head {
			font-size: .9rem;
			color: #fff;
		}
		.user-name {
			margin-left: .1rem;
			font-size: .5rem;
		}
	}
</style>