let vue = require('vue');
let io = require('socket.io-client');
let host = 'http://localhost:3000/';
module.exports = {
	//上车了上车了，有什么消息都可以传输
	bus: new vue.default(),
	storageUser: (user) => {
		sessionStorage.userName = user.userName;
		sessionStorage.userId = user.userId;
		sessionStorage.head = user.head;
		sessionStorage.sex = user.sex;
	},
	toggleHeader: function(isShow) {
		this.bus.$emit('toggleHeader', isShow);
	},
	toggleFooter: function(isShow) {
		this.bus.$emit('toggleFooter', isShow);
	},
	changeHeader: function(config) {
		this.bus.$emit('changeHeader', config);
	},
	toggleWishHeader: function(isShow) {
		this.bus.$emit('toggleWishHeader', isShow);
	},
	toggleWishFooter: function(isShow) {
		this.bus.$emit('toggleWishFooter', isShow);
	},
	changeWishHeader: function(config) {
		this.bus.$emit('changeWishHeader', config);
	},
	getUserHead: function(head, sex) {
		if(head != 'null') {
			return head;
		}else if(sex == '1') {
			return 'static/img/girlHead.png';
		}else {
			return 'static/img/boyHead.png';
		}
	},
	getCookie: (key) => {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
	},
	setCookie: (key, value, date, path, domain, secure) => {
		if(!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
			return false;
		}
		var expires = "";
	    if (date) {
	      switch (date.constructor) {
	        case Number:
	          expires = date === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + date;
	          break;
	        case String:
	          expires = "; expires=" + date;
	          break;
	        case Date:
	          expires = "; expires=" + date.toUTCString();
	          break;
	      }
	    }
	    document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
	    return true;
	},
	removeItem: (key, path, domain) => {
	    if (!key || !this.hasItem(key)) { return false; }
	    document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( domain ? "; domain=" + domain : "") + ( path ? "; path=" + path : "");
	    return true;
	},
	hasItem: (key) => {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	/* optional method: you can safely remove it! */
	keys: () => {
		var key = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nIdx = 0; nIdx < key.length; nIdx++) { key[nIdx] = decodeURIComponent(key[nIdx]); }
		return key;
	}
}
