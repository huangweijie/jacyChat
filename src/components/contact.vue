<template>
	<transition name="contact-open">
		<div class="container">
			<p>123123123123</p>
		</div>
	</transition>
</template>

<script>
	let http = require('../axios')
	let common = require('../common')
	let io = require('socket.io-client')
	module.exports = {
		data() {
			return {
				socket: io(this.host)
			}
		},
		props: ['host'],
		methods: {

		},
		created() {
			common.changeHeader(this, {
				hasReturn: true,
				isContact: true,
				contactName: this.$route.params.contactName
			});
			this.socket.emit('my other event', {
				a: 'a'
			})
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
</style>