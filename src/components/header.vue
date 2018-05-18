<template>
	<header>
     	<i v-if="headerConfig.hasReturn" class="ui-icon-return return" @click="back"></i>
     	<span v-if="headerConfig.hasTitle" class="title">Jacy Chat</span>
     	<div v-if="headerConfig.hasPerMes" class="perMes">
     		<!-- <i :class="[{'ui-icon-personal': head == 0, 'ui-icon-female': head == 1}, 'user-head']"></i> -->
     		<img :src="head" class="user-head" alt="" />
     		<span class="user-name">{{userName}}</span>
     	</div>
     	<span v-if="headerConfig.isContact" class="contactName">{{headerConfig.contactName}}</span>
     	<i v-if="headerConfig.hasRefresh" class="ui-icon-refresh refresh" @click="refresh"></i>
     	<i v-if="headerConfig.hasAdd" class="ui-icon-add add" @click='add'></i>
     	<i v-if='headerConfig.hasEditFD' class="icon-editFD editFD" @click='showEditFD'></i>
    </header>
</template>

<script>
	let common = require('../common')
	module.exports = {
		props: ['headerConfig'],
		data() {
			return {
				userName: sessionStorage.userName,
				head: ''
			}
		},
		watch: {
			'headerConfig.hasPerMes': function(val, oldVal) {
				this.head = common.getUserHead(sessionStorage.head, sessionStorage.sex);
				this.userName = sessionStorage.userName;
			}
		},
		methods: {
			back: () => {
				history.go(-1);
			},
			refresh: () => {
				common.bus.$emit('refresh');
			},
			add: () => {
				common.bus.$emit('search', true)
			},
			showEditFD: () => {
				common.bus.$emit('showEditFD');
			}
		},
		created: function() {
			this.head = common.getUserHead(sessionStorage.head, sessionStorage.sex);

			common.bus.$on('changeHeader', (config) => {
				for(let key in this.headerConfig) {
					this.headerConfig[key] = false;
				}
				for(let key in config) {
                    this.headerConfig[key] = config[key];
                }
			})
		}
	}
</script>

<style lang="less" scoped>
	@heightLine: 1.3rem;
	header {
		display: box;
		display: -webkit-box;
		// -webkit-box-pack: center;
		-webkit-box-align: center;
		position: fixed;
		width: 100%;
		height: @heightLine;
		background-color: #57c2e8;
		font-size: 0.5rem;
		line-height: @heightLine;
		color: #fff;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 .3rem;
		z-index: 999;
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
		font-size: .55rem;
  	}
	.refresh {
		position: absolute;
		right: 1.2rem;
		top: .1rem;
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
			width: 1rem;
			height: 1rem;
			vertical-align: middle;
		}
		.ui-icon-female {
			font-size: 1.2rem;
		}
		.user-name {
			margin-left: .1rem;
			font-size: .5rem;
		}
	}
	.editFD {
		position: absolute;
	    right: .4rem;
	    top: .27rem;
		display: box;
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-pack: center;
		font-size: .8rem;
		color: rgba(0, 0, 0, .5);
	}
</style>