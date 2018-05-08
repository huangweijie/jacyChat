<template>
	<div class="loginContent">
		<div class="login-register-btn">
			<button class="ui-btn-lg ui-btn-primary toLoginBtn" @click='showLogin'>登录</button>
			<button class="ui-btn-lg ui-btn-primary toRegisterBtn" @click='showRegister'>注册</button>
		</div>
		<div class="login" :class='{fadeIn: loginFadeIn}'>
			<div class="loginMes">
				<form class="loginForm">
					<div class="userIdInput">
						<i class="icon-userName"></i>
						<input type="text" ref="loginUserId" placeholder='用户名' @input="filterChinese($event)">
					</div>
					<div class="passwordInput">
						<i class="icon-password"></i>
						<input type="password" ref="loginPassword" placeholder='密码' @input="filterChinese($event)">
					</div>
				</form>
				<button class="ui-btn-lg ui-btn-primary loginBtn" @click="login">登录</button>
				<button class="ui-btn-lg ui-btn cancelBtn" @click='cancel'>返回</button>
			</div>
		</div>
		<div class="register" :class='{fadeIn: registerFadeIn}'>
			<div class="registerMes">
				<form class="registerForm">
					<div class="userNameInput">
						<span class="userName">昵称</span>
						<input type="text" ref="userName">
						<input class="upload" type="file" ref='upload' accept="image/jpeg,image/jpg,image/png" />
						<!-- <i class="icon-upload-clound" @click='uploadHead'></i> -->
						<img class="previewImg icon-upload-clound" ref='previewImg' src="" alt="" @click='uploadHead'/>
					</div>
					<div class="sexInput" @click='fixedSex'>
						<span class="sex">性别</span>
						<input type="text" readonly ref="sex" :value='sex'>
						<div class="chooseSex" @click.stop='chooseAcancel' v-if='chooseSex'>
							<div class="sexChooseContent">
								<div class="sexText">性别</div>
								<div class="boy">
									<input id='chooseBoy' name='sex' type="radio" refs='boySelection' @change="chooseBoy" :checked='sex == "男"'/>
									<label for='chooseBoy'><span>男</span></label>
								</div>
								<div class="girl">
									<input id='chooseGirl' name='sex' type="radio" refs='girlSelection' @change="chooseGirl" :checked='sex == "女"'/>
									<label for='chooseGirl'><span>女</span></label>
								</div>
							</div>
						</div>
					</div>
					<div class="userIdInput">
						<span class="regUserId">用户名</span>
						<input type="text" ref="regUserId">
					</div>
					<div class="passwordInput">
						<span class="regPassword">密码</span>
						<input type="password" ref="regPassword">
					</div>
					<div class="repeatPwInput">
						<span class="repeatPw">确认密码</span>
						<input type="password" ref="repeatPw">
					</div>
				</form>
				<button class="ui-btn-lg ui-btn-primary registerBtn" @click="register">注册</button>
				<button class="ui-btn-lg ui-btn cancelBtn" @click='cancel'>返回</button>
			</div>
		</div>
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
				tipShow: false,
				tips: '',
				throttle: true,
				loginFadeIn: false,
				registerFadeIn: false,
				sex: '',
				chooseSex: false,
				head: ''
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
		mounted: function() {
			var uploadFile = this.$refs.upload;
			uploadFile.onchange = () => {
				var pvImg = this.$refs.previewImg;
				var files = uploadFile.files;
				var reader = new FileReader();
				if(files[0]) {
					reader.onload = (e) => {
						pvImg.src = e.target.result;
						this.head = files[0];
					}
					reader.readAsDataURL(files[0]);
				}
			}
		},
		methods: {
			login: function(e) {
				e.preventDefault();
				var data = {
					userId: this.$refs.loginUserId.value,
					password: this.$refs.loginPassword.value
				}
				http('post', this.host + 'login', data, 'json', (res) => {
					console.log(res)
					if(res.data.code == 1) {
						common.storageUser(res.data.user);
						//触发视图更新
						(this.$parent.$children)[0].userName = sessionStorage.userName;
						(this.$parent.$children)[0].head = sessionStorage.head
						location.replace('/#/chat')
					}else {
						this.throttle = false;
						this.tipShow = true;
						this.tips = res.data.msg;
					}
				}, function(err) {
					console.log(err);
				})
			},
			register: function(e) {
				e.preventDefault();
				var password = this.$refs.regPassword.value,
					repeatPw = this.$refs.repeatPw.value;
				if(password !== repeatPw && this.throttle) {
					this.throttle = false;
					this.tipShow = true;
					this.tips = 'fail';
				}else if(password === repeatPw) {
					let data = new FormData();
					data.append('userId', this.$refs.regUserId.value);
					data.append('password', this.$refs.regPassword.value);
					data.append('userName', this.$refs.userName.value);
					data.append('sex', this.sex == '女' ? 1 : 0);
					data.append('head', this.head);
					http('post', this.host + 'register', data, 'json', (res) => {
						if(res.data.code == 1) {
							common.storageUser(res.data.user)
							//触发视图更新
							(this.$parent.$children)[0].userName = sessionStorage.userName;
							location.replace('/#/chat')
						}else {
							this.throttle = false;
							this.tipShow = true;
							this.tips = res.data.msg;
						}
					}, function(err) {
						console.log(err)
					})		
				}
			},
			/**
			 * 显示登录界面
			 */
			showLogin: function() {
				this.loginFadeIn = true;
			},
			/**
			 * 显示注册界面
			 */
			showRegister: function() {
				this.registerFadeIn = true;
			},
			cancel: function() {

				this.loginFadeIn = false;
				this.registerFadeIn = false;
			},
			filterChinese: function(e) {
				e.target.value = e.target.value.replace(/[\u4e00-\u9fa5]/g,'');
			},
			uploadHead: function() {
				this.$refs.upload.click();
			},
			fixedSex: function() {
				this.chooseSex = true;
			},
			chooseAcancel: function() {
				this.chooseSex = false;
			},
			chooseBoy: function() {
				this.sex = '男';
			},
			chooseGirl: function() {
				this.sex = '女'
			}
		}
	}
</script>

<style lang="less">
	.loginContent {
		// background: url('http://ww4.sinaimg.cn/large/0060lm7Tgy1fiuutvfnskj30u01hc7wh.jpg') no-repeat;
		background: url('https://images.pexels.com/photos/1019771/pexels-photo-1019771.jpeg?auto=compress&cs=tinysrgb&h=1334&w=750') no-repeat;
		background-position: 0 bottom;
		background-size: 100% 100%;
		background-color: #f8f8f8;
		position: fixed;
		width: 100%;
		height: 100%;
		padding-top: 1.3rem;
		top: 0;
		left: 0;
		padding: 0 .5rem;
		box-sizing: border-box;
		.login-register-btn {
			position: absolute;
			width: 9rem;
			height: 2.6rem;
			top: 0;
			bottom: 3rem;
			margin: auto;
			.toLoginBtn, .toRegisterBtn {
				font-size: .5rem;
				height: 1.3rem;
				line-height: 1.3rem;
				width: 70%;
				margin: .5rem auto;
				// background: rgba(21, 180, 236, 0.9);
				background: rgba(255, 255, 255, .1);
				// background: rgba(0, 0, 0, .3);
				color: rgba(255, 255, 255, .9);
				border: 1px solid #fff;
				&:before {
					border: none;
				}
				&:active {
					background: rgba(0, 0, 0, .3);
					// background: rgba(255, 255, 255, .1);
					border-color: #fff;
					color: #fff;
				}
			}
			.toLoginBtn {
				margin-bottom: .5rem;
			}
		}
		.login, .register {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 1.3rem;
			left: 100%;
			transition: left .3s .2s;
			background-color: #f8f8f8;
			padding: 0 .5rem;
			box-sizing: border-box;
			&.fadeIn {
				left: 0;
			}
		}
		.loginMes, .registerMes {
			.loginBtn, .registerBtn {
				margin: .3rem 0;
			}
			input {
				display: inline-block;
				width: 70%;
				font-size: .5rem;
				line-height: 1rem;
				vertical-align: middle;
			}
		}
		.loginMes {
			text-align: center;
			position: absolute;
			width: 9rem;
			height: 8rem;
			overflow: hidden;
			top: 0;
			bottom: 0;
			margin: auto;
		}
		.loginForm {
			input {
				border: 1px solid rgba(0, 0, 0, .3);
				border-radius: 3px;
				text-indent: 1rem;
			}
			.userIdInput, .passwordInput {
				position: relative;
				margin-bottom: .5rem;
			}
			.icon-userName, .icon-password {
				font-size: .6rem;
				height: .7rem;
				color: #999;
				position: absolute;
				left: 17%;
				top: 0;
				bottom: 0;
				margin: auto;
			}
			.icon-password {
				font-size: .8rem;
				height: .9rem;
				left: 16%;
			}
		}
		.registerForm {
			padding-top: .5rem;
			& > div {
				font-size: 0;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
				& > input {
					width: 7rem;
					background-color: transparent;
					text-indent: .3rem;
					line-height: 1.5rem;
					vertical-align: bottom;
				}
				& > span {
					display: inline-block;
					line-height: 1.5rem;
					font-size: .4rem;
					width: 1.7rem;
					padding-left: .3rem;
					vertical-align: bottom;
					color: #666;
				}
			}
			.userNameInput {
				position: relative;
				border-bottom: 0;
				input {
					width: 5rem;
					border-bottom: 1px solid rgba(0, 0, 0, .1);
					&.upload {
						width: 0;
						height: 0;
						visibility: hidden;
					}	
				}
				.previewImg {
					width: 2rem;
					height: 2rem;
					position: absolute;
					right: 0;
					bottom: 0;
				}
				span {
					border-bottom: 1px solid rgba(0, 0, 0, .1);
				}
				.icon-upload-clound {
					display: inline-block;
					font-size: 2rem;
					width: 2rem;
					height: 2rem;
					vertical-align: bottom;
				}
			}
			.sexInput {
				position: relative;
				& > input {
					font-size: .45rem;
					color: #333;
				}
				.chooseSex {
					position: fixed;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, .6);
					top: 0;
					left: 0;
					z-index: 2;
					.sexChooseContent {
						position: absolute;
						width: 7rem;
						height: 5rem;
						background-color: #fff;
						left: 0;
						right: 0;
						top: 0;
						bottom: 2rem;
						margin: auto;
						border-radius: 5px;
						box-sizing: border-box;
						font-size: .6rem;
						padding: .5rem;
						.sexText {
							margin-bottom: .4rem;
						}
						.boy, .girl {
							width: 100%;
							font-size: .5rem;
							line-height: 1.2rem;
							box-sizing: border-box;
							padding: 0 .3rem;
							text-align: justify;
							label {
								display: block;
								width: 100%;
								position: relative;
								span {
									display: inline-block;
									vertical-align: middle;
								}
							}
							input {
								display: none;
								& + label:after {
									content: "";
									display: inline-block;
									position: absolute;
								    width: .5rem;
								    height: .5rem;
								    border-radius: 50%;
								    border: 1px solid #666;
								    line-height: 1; 
								    box-sizing: border-box;
								    top: 0;
								    bottom: 0;
								    right: 0;
								    margin: auto;
								}
								&:checked + label:after {
									// border: 1px solid #01cd78;
									border: 1px solid #57c2e8;
									// background-color: #01cd78;
									background-color: #57c2e8;
								    background-clip: content-box;
								    padding: .07rem;
								}
							}
						}
						.boy {
							border-bottom: 1px solid rgba(0, 0, 0, .1);
						}
					}
				}
			}
		}
	}
</style>