var axios = require('axios');

var httpApi = function(method, url, data, responseType, successFn, errorFn) {
	if(method == 'get') {
		axios({
			method: method,
			url: url,
			params: data,
			responseType: responseType,
			withCredentials: true
		})
		.then(successFn)
		.catch(errorFn)
	}else {
		axios({
			method: method,
			url: url,
			data: data,
			responseType: responseType,
			withCredentials: true
		})
		.then(successFn)
		.catch(errorFn)
	}
}

module.exports = httpApi;