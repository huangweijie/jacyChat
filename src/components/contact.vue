<template>
	<div class="container">
		<button @click="close">close</button>
		<transition name="contact-open">
			<p v-if='show'>123123123123</p>
		</transition>
	</div>
</template>

<script>
	var http = require('../axios')
	module.exports = {
		data() {
			return {
				show: true
			}
		},
		methods: {
			close: function() {
				this.show = !this.show
			}
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