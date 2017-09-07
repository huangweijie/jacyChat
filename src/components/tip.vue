<template>
	<div class="tips">
		{{tips}}
	</div>
</template>

<script>
	module.exports = {
		props: ['tips'],
		created() {
			setTimeout(() => {
				document.getElementsByClassName('tips')[0].style.opacity = 0;
				setTimeout(() => {
					this.$parent.tipShow = false;
					this.$parent.throttle = true;
				}, 500)
			}, 1000)
		}
	}
</script>

<style lang="less" scoped>
	.tips {
		width: 70%;
		padding: .2rem 1rem;
		box-sizing: border-box;
		text-align: center;
		background-color: rgba(0, 0, 0, .8);
		font-size: .5rem;
		opacity: 1;
		transition: opacity .5s;
		color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: 40%;
		border-radius: .3rem;
	}
</style>