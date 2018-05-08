<template>
	<transition name="contact-open">
		<div class="container">
			<div class="message">
				<ul>
					<li v-for="mes in mesList" :class="{'right' : mes.isSelf, 'left' : !mes.isSelf, 'center': mes.tips}">{{mes.user}} : {{mes.mes}}</li>
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
						mes: mes,
						fromHead: sessionStorage.head,
						toHead: this.$route.params.head,
						fromName: sessionStorage.userName,
						toName: this.$route.params.contactName
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
							user: this.$route.params.contactName,
						})
					}else {
						this.mesList.push({
							tips: true,
							mes: datafromName + '给你发送新消息了',
							user: 'system'
						})
					}
				})
				//对方接收(即自己发出)
				this.socket.on('to' + this.$route.params.contactId, (data) => {
					console.log('push')
					this.mesList.push({
						isSelf: true,
						mes: data,
						user: sessionStorage.userName
					})
				})
			}
		},
		created() {
			common.changeHeader(this, {
				hasReturn: true,
				isContact: true,
				contactName: this.$route.params.contactName
			});
			this.bindEvent();
			http('post', this.host + 'updateRecentMes', {
				to: this.$route.params.contactId,
				fromHead: sessionStorage.head,
				toHead: this.$route.params.head,
				fromName: sessionStorage.userName,
				toName: this.$route.params.contactName
			}, 'json', (res) => {
				console.log(res);
			}, (err) => {
				console.log(err);
			})
			this.$parent.hasFooter = false;
		},
		mounted() {
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
	.message li {
		display: block;
	}
	.right {
		text-align: right;
		margin-right: .5rem;
		padding-left: 50%;
   		word-wrap: break-word;
   		padding-top: .2rem;
   		padding-bottom:  .2rem;
	}
	.left {
		text-align: left;
		margin-left: .5rem;
		padding-right: 50%;
   		word-wrap: break-word;
   		padding-top: .2rem;
   		padding-bottom:  .2rem;
	}
	.center {
		text-align: center;
		width: 100%;
		padding-top: .2rem;
		padding-bottom:  .2rem;
	}
</style>