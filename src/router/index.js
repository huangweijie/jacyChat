import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login'
// import home from '@/components/home'
let common = require('../common');

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
const find = resolve => {
	require.ensure(['../components/find.vue'], () => {
		resolve(require('../components/find.vue'))
	})
} 
const friendDynamic = resolve => {
	require.ensure(['../components/friendDynamic.vue'], () => {
		resolve(require('../components/friendDynamic.vue'))
	})
}
const gameList = resolve => {
	require.ensure(['../components/gameList.vue'], () => {
		resolve(require('../components/gameList.vue'))
	})
}
const wish = resolve => {
	require.ensure(['../components/wish/wish.vue'], () => {
		resolve(require('../components/wish/wish.vue'))
	})
}
const wishHome = resolve => {
	require.ensure(['../components/wish/home.vue'], () => {
		resolve(require('../components/wish/home.vue'))
	})
}
const wishSearch = resolve => {
	require.ensure(['../components/wish/search.vue'], () => {
		resolve(require('../components/wish/search.vue'))
	})
}
const wishEdit = resolve => {
	require.ensure(['../components/wish/wishEdit.vue'], () => {
		resolve(require('../components/wish/wishEdit.vue'))
	})
}
const wishMessage = resolve => {
	require.ensure(['../components/wish/message.vue'], () => {
		resolve(require('../components/wish/message.vue'))
	})
}
const wishPer = resolve => {
	require.ensure(['../components/wish/personal.vue'], () => {
		resolve(require('../components/wish/personal.vue'))
	})
}
const getWish = resolve => {
	require.ensure(['../components/wish/getWish.vue'], () => {
		resolve(require('../components/wish/getWish.vue'))
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
			},
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(false);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
	    }, {
			path: '/login',
	    	name: 'login',
	    	component: login,
	    	beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(false);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/chat',
			name: 'home',
			component: home,
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(true);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/contactList',
			name: 'contactList',
			component: contactList,
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(true);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/contact',
			name: 'contact',
			component: contact,
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(false);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/personal',
			name: 'personal',
			component: personal,
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(true);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/friendDy',
			name: 'friendDy',
			component: friendDynamic,
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(false);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/find',
			name: 'find',
			component: find,
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(true);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/game',
			name: 'gameList',
			component: gameList,
			beforeEnter: (to, from, next) => {
				common.toggleHeader(true);
				common.toggleFooter(true);
				common.toggleWishHeader(false);
				common.toggleWishFooter(false);
				next();
			}
		}, {
			path: '/wish',
			component: wish,
			children: [{
				path: '/',
				name: 'wishHome',
				component: wishHome,
				beforeEnter: (to, from, next) => {
					common.toggleWishHeader(true);
					common.toggleWishFooter(true);
					common.toggleHeader(false);
					common.toggleFooter(false);
					common.changeWishHeader({
						title: '首页',
						hasBack: false
					});
					next();
				}
			}, {
				path: '/wishSearch',
				name: 'wishSearch',
				component: wishSearch,
				beforeEnter: (to, from, next) => {
					common.toggleWishHeader(true);
					common.toggleWishFooter(true);
					common.toggleHeader(false);
					common.toggleFooter(false);
					common.changeWishHeader({
						title: '搜索',
						hasBack: true
					});
					next();
				}
			}, {
				path: '/wishEdit',
				name: 'wishEdit',
				component: wishEdit,
				beforeEnter: (to, from, next) => {
					common.toggleWishHeader(true);
					common.toggleWishFooter(false);
					common.toggleHeader(false);
					common.toggleFooter(false);
					common.changeWishHeader({
						title: '许愿',
						hasBack: true
					});
					next();
				}
			}, {
				path: '/wishMessage',
				name: 'wishMessage',
				component: wishMessage,
				beforeEnter: (to, from, next) => {
					common.toggleWishHeader(true);
					common.toggleWishFooter(true);
					common.toggleHeader(false);
					common.toggleFooter(false);
					common.changeWishHeader({
						title: '消息',
						hasBack: true
					});
					next();
				}
			}, {
				path: '/wishPer',
				name: 'wishPer',
				component: wishPer,
				beforeEnter: (to, from, next) => {
					common.toggleWishHeader(true);
					common.toggleWishFooter(true);
					common.toggleHeader(false);
					common.toggleFooter(false);
					common.changeWishHeader({
						title: '个人中心',
						hasBack: true
					});
					next();
				}
			}, {
				path: '/getWish',
				name: 'getWish',
				component: getWish,
				beforeEnter: (to, from, next) => {
					common.toggleWishHeader(true);
					common.toggleWishFooter(false);
					common.toggleHeader(false);
					common.toggleFooter(false);
					common.changeWishHeader({
						title: '愿望详情',
						hasBack: true
					});
					next();
				}
			}]
		}
  	]
})
