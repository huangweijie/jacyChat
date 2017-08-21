var axios = require('axios');

var httpApi = function(method, url, data, responseType, successFn, errorFn) {
	axios({
		method: method,
		url: url,
		data: data,
		responseType: responseType
	})
	.then(successFn)
	.catch(errorFn)
}

module.exports = httpApi;