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
const contactList = resolve => {
	require.ensure(['../components/contactList.vue'], () => {
		resolve(require('../components/contactList.vue'))
	})
}
const personal = resolve => {
	require.ensure(['../components/perMes.vue'], () => {
		resolve(require('../components/perMes.vue'))
	})
}
const friendDynamic = resolve => {
	require.ensure(['../components/friendDynamic.vue'], () => {
		resolve(require('../components/friendDynamic.vue'))
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
			path: '/chat',
			name: 'home',
			component: home
		}, {
			path: '/contactList',
			name: 'contactList',
			component: contactList
		}, {
			path: '/contact',
			name: 'contact',
			component: contact
		}, {
			path: '/personal',
			name: 'personal',
			component: personal
		}, {
			path: '/friendDynamic',
			name: 'friendDynamic',
			component: friendDynamic
		}
  	]
})
