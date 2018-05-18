<template>
	<transition name="contact-open">
		<div class="container">
			<div class="message" ref='messageList'>
				<ul>
					<li v-for="mes in mesList" :class="{'right' : mes.isSelf, 'left' : !mes.isSelf, 'center': mes.tips}">
						<div class="userHead">
							<img :src="mes.user|getUserHead" alt="" />
						</div>
						<div class="mes">{{mes.mes}}</div>
					</li>
				</ul>
			</div>
			<textarea ref='textarea' @input='input($event)'></textarea>
			<button class="ui-btn" @click='send'>发送</button>
		</div>
	</transition>
</template>

<script>
	let http = require('../axios')
	let common = require('../common')
	module.exports = {
		data() {
			return {
				mesList: []
			}
		},
		props: ['host', 'socket'],
		methods: {
			send() {
				if(this.$refs.textarea.value) {
					let mes = this.$refs.textarea.value;
					this.$refs.textarea.value = '';
					console.log(mes)
					this.socket.emit('send', {
						from: sessionStorage.userId,
						to: this.$route.params.contactId,
						mes: mes
						// fromHead: sessionStorage.head,
						// toHead: this.$route.params.head,
						// fromName: sessionStorage.userName,
						// toName: this.$route.params.contactName
					})
				}
			},
			input(e) {
				if(this.$refs.textarea.value.length > 150) {
					this.$refs.textarea.value = this.$refs.textarea.value.slice(0, 150)
				}
			},
			bindEvent() {
				//自己接收
				console.log('to' + sessionStorage.userId)
				console.log('to' + this.$route.params.contactId)
				this.socket.on('to' + sessionStorage.userId, (data, datafrom, datafromName) => {
					console.log('get')
					if(datafrom == this.$route.params.contactId) {
						this.mesList.push({
							isSelf: false,
							mes: data,
							user: {
								userName: this.$route.params.contactName,
								head: this.$route.params.head,
								sex: this.$route.params.sex
							}
						})
						this.$nextTick(() => {
							this.scrollBottom(this.$refs.messageList);
						})
					}else {
						// this.mesList.push({
						// 	tips: true,
						// 	mes: datafromName + '给你发送新消息了',
						// 	user: 'system'
						// })
					}
				})
				//对方接收(即自己发出)
				this.socket.on('to' + this.$route.params.contactId, (data) => {
					console.log('push')
					this.mesList.push({
						isSelf: true,
						mes: data,
						user: {
							head: sessionStorage.head,
							sex: sessionStorage.sex,
							userName: sessionStorage.userName
						}
					})
					this.$nextTick(() => {
						this.scrollBottom(this.$refs.messageList);
					})
				})
			},
			getContactMes() {
				http('get', this.host + 'getContactMes', {
					contactId: this.$route.params.contactId
				}, 'json', (res) => {
					res.data.contactMesList.forEach((value, index) => {
						if(value.sendUser.userId == sessionStorage.userId) {
							this.mesList.push({
								isSelf: true,
								mes: value.mes,
								user: {
									head: sessionStorage.head,
									sex: sessionStorage.sex,
									userName: sessionStorage.userName
								}
							})
						}else {
							this.mesList.push({
								isSelf: false,
								mes: value.mes,
								user: {
									userName: this.$route.params.contactName,
									head: this.$route.params.head,
									sex: this.$route.params.sex
								}
							})
						}
					})
					this.$nextTick(() => {
						this.scrollBottom(this.$refs.messageList);
					})
				}, (err) => {
					console.log(err);
				})
			},
			scrollBottom(dom) {
				if(dom) {
					dom.scrollTop = dom.scrollHeight;
				}
			}
		},
		filters: {
			getUserHead(user) {
				return common.getUserHead(user.head, user.sex);
			}
		},
		created() {
			common.changeHeader({
				isContact: true,
				contactName: this.$route.params.contactName,
				hasReturn: true
			})
			http('post', this.host + 'updateRecentMes', {
				to: this.$route.params.contactId
			}, 'json', (res) => {
				console.log(res);
			}, (err) => {
				console.log(err);
			})

			this.getContactMes();
		},
		mounted() {
			this.bindEvent();
			document.documentElement.style.backgroundColor = '#f8f8f8';
		}
	}
</script>

<style lang="less" scoped>
	.contact-open-enter-active {
		// transition: all 2s ease;
	}
	.contact-open-enter {
		// opacity: 0;
	}
	.contact-open-enter-to {
		// opacity: 1;
	}
	.container {
		position: absolute;
		width: 100%;
		top: 1.3rem;
		bottom: 0;
		textarea {
			display: block;
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 3.5rem;
			resize: none;
			padding: .3rem .3rem 1rem;
			box-sizing: border-box;
			background-color: #fff;
			border-top: 1px solid #999;
			// box-shadow: 0 -1px 1px 3px rgba(0, 0, 0, .3);
		}
		.ui-btn {
			position: absolute;
			bottom: .2rem;
			right: .3rem;
		}
		.message {
			position: absolute;
			width: 100%;
			top: 0;
			bottom: 3.5rem;
			overflow: auto;
			li {
				display: block;
			}
		}
		.right {
			text-align: right;
			margin-right: .5rem;
			padding-left: 50%;
	   		word-wrap: break-word;
	   		padding-top: .2rem;
	   		padding-bottom:  .2rem;
	   		overflow: hidden;
	   		.mes {
	   			display: inline-block;
	   			position: relative;
	   			background: #57c2e8;
	   			padding: .2rem .2rem;
	   			border-radius: 5px;
	   			border: 1px solid rgba(0, 0, 0, .1);
	   			margin-right: .3rem;
	   			float: right;
	   			&:after {
					content: '';
					display: block;
					position: absolute;
					right: -.4rem;
					top: .3rem;
					border: .2rem solid #57c2e8;
					border-top-color: transparent;
					border-right-color: transparent;
					border-bottom-color: transparent;
	   			}
	   		}
	   		.userHead {
	   			position: relative;
	   			display: inline-block;
	   			width: 1rem;
	   			height: 1rem;
	   			float: right;
				img {
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
	   		}
		}
		.left {
			text-align: left;
			margin-left: .5rem;
			padding-right: 50%;
	   		word-wrap: break-word;
	   		padding-top: .2rem;
	   		padding-bottom:  .2rem;
	   		overflow: hidden;
	   		.mes {
	   			display: inline-block;
	   			position: relative;
	   			background: #fff;
	   			padding: .2rem .2rem;
	   			border-radius: 5px;
	   			border: 1px solid rgba(0, 0, 0, .1);
	   			margin-left: .3rem;
	   			float: left;
	   			&:before {
					content: '';
					display: block;
					position: absolute;
					left: -.4rem;
					top: .3rem;
					border: .2rem solid #fff;
					border-top-color: transparent;
					border-left-color: transparent;
					border-bottom-color: transparent;
	   			}
	   		}
	   		.userHead {
	   			position: relative;
	   			display: inline-block;
	   			width: 1rem;
	   			height: 1rem;
	   			float: left;
				img {
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
	   		}
		}
		.center {
			text-align: center;
			width: 100%;
			padding-top: .2rem;
			padding-bottom:  .2rem;
		}
	}
</style>