<template>
	<transition name="contact-open">
		<div class="container">
			<p v-if='show'>123123123123</p>
		</div>
	</transition>
</template>

<script>
	let http = require('../axios')
	let common = require('../common')
	module.exports = {
		data() {
			return {
				show: true
			}
		},
		methods: {
			close: function() {
				this.show = !this.show
			},
			testA: () => {
				console.log(this)
			}
		},
		created() {
			var self = {'a':'1'}
			common.changeHeader(this, {
				hasReturn: true,
				isContact: true
			});
		}
	}
</script>

<style lang="less" scoped>
	.contact-open-enter-active {
		transition: all 2s ease;
	}
	.contact-open-enter {
		opacity: 0;
	}
	.contact-open-enter-to {
		opacity: 0.5;
	}
</style>