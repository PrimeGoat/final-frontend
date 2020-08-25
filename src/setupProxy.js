const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use('/weather', createProxyMiddleware({
		target: 'https://api.weatherbit.io/',
		changeOrigin: true,
		pathRewrite: {'^/weather' : '/'}
	}));

	app.use('/api', createProxyMiddleware({
		target: 'http://localhost:3500/',
		changeOrigin: true,
		pathRewrite: {'^/api' : '/api/v1'},
//		secure: false
	}));

	app.use('/zipcode', createProxyMiddleware({
		target: 'https://www.zipcodeapi.com/',
		changeOrigin: true,
		pathRewrite: {'^/zipcode' : '/'},
//		secure: false
	}));
};
