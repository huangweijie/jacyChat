import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login'
// import home from '@/components/home'

const test = resolve => {
	require.ensure(['../components/login.vue'], () => {
		resolve(require('../components/login.vue'))
	})
}
const login = resolve => {
	require.ensure(['../components/login.vue'], () => {
		resolve(require('../components/login.vue'))
	})
}
const home = resolve => {
	require.ensure(['../components/home.vue'], () => {
		resolve(require('../components/home.vue'))
	})
}
const contact = resolve => {
	require.ensure(['../components/contact.vue'], () => {
		resolve(require('../components/contact.vue'))
	})
}

Vue.use(Router)

export default new Router({
  	routes: [{
			path: '/',
			name: 'index',
			redirect: {
				path: '/login',
				name: 'login'
			}
	    }, {
			path: '/login',
	    	name: 'login',
	    	component: login
		}, {
			path: '/home',
			name: 'home',
			component: home
		}, {
			path: '/contact/:userId/:contactId/:contactName/:head',
			name: 'contact',
			component: contact
		}
  	]
})
