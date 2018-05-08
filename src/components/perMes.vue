<template>
	<section class="perMes">
		<!-- <i class="close" @click="close">X</i>
		<i :class="[{'ui-icon-personal': headProp == 0, 'ui-icon-female': headProp == 1}, 'userHead']" @click="changeHead" ref="userhead"></i>
		<input class="userName" :value="userName" :disabled="!isSelf" ref='userName'>
		<button class="saveBtn ui-btn" @click="save">保存</button> -->
		<div class="head">
			<div class="left">头像</div>
			<div class="right">
				<img src="" alt="" />
			</div>
		</div>
		<div class="userName" @click='changeUerName'>
			<div class="left">昵称</div>
			<div class="right">{{userName}}</div>
		</div>
		<div class="userId">
			<div class="left">帐号</div>
			<div class="right">{{userId}}</div>
		</div>
		<div class="sex">
			<div class="left">性别</div>
			<div class="right">{{sex}}</div>
		</div>
		<div class="area">
			<div class="left">地区</div>
			<div class="right"></div>
		</div>
		<div class="perTab" @click='changePerTab'>
			<div class="left">个性签名</div>
			<div class="right"></div>
		</div>
		<div class="editArea" :class='{fadeIn: editAreaShow}'>
			<input type="text" maxlength='16' :value='inputMes'/>
			<p class="tips">{{tips || ''}}</p>
			<div class="button">
				<button class="ui-btn ui-btn-primary save">保存</button>
				<button class="ui-btn cancel" @click='editAreaOut'>取消</button>
			</div>
		</div>
	</section>
</template>

<script>
	let common = require('../common.js')
	let http = require('../axios.js')
	module.exports = {
		data() {
			return {
				head: 0,
				userName: sessionStorage.userName,
				userId: sessionStorage.userId,
				sex: '男',
				editAreaShow: false,
				inputMes: '',
				tips: ''
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
			},
			/**
			 * 编辑区域进入
			 */
			editAreaIn(tips) {
				this.editAreaShow = true;
				this.tips = tips;
			},
			/**
			 * 编辑区域移出
			 */
			editAreaOut() {
				this.editAreaShow = false;
			},
			/**
			 * 修改个性签名
			 */
			changePerTab() {
				this.editAreaIn('');
				this.inputMes = '个性签名'
			},
			/**
			 * 修改用户昵称
			 */
			changeUerName() {
				this.editAreaIn('好名字可以让你的朋友更容易记住你。');
				this.inputMes = this.userName;
			}
		},
		created() {
			this.head = sessionStorage.head;
		}
	}
</script>

<style lang="less" scoped>
	.perMes {
		background-color: #fff;
		& > div:not(.editArea) {
			box-sizing: border-box;
			padding: 0 .5rem;
			width: 100%;
			background-color: #fff;
			border-bottom: 1px solid rgba(0, 0, 0, .1);
			min-height: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&:active {
				background: rgba(0, 0, 0, .2);
			}
		}
		.left {
			display: inline-block;
		}
		.right {
			display: inline-block;
			color: #666;
		}
		.editArea {
			position: fixed;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			background: #fff;
			top: 1.3rem;
			left: 10rem;
			transition: left .3s .2s;
			padding: .7rem .5rem;
			input {
				display: block;
				width: 100%;
				height: .9rem;
				line-height: .9rem;
				font-size: .5rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
				text-indent: .3rem;
			}
			.tips {
				color: #666;
				margin-top: .4rem;
				margin-left: .1rem;
			}
			.button {
				position: relative;
				text-align: center;
				top: 1rem;
				button {
					width: 3rem;
					height: 1rem;
					font-size: .5rem;
					margin-right: .5rem;
					&.save {
						margin-right: .3rem;
					}
				}
			}
			&.fadeIn {
				left: 0;
			}
		}
	}
</style>