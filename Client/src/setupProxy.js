const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app){
    app.use('/api',
    createProxyMiddleware({
        target: 'http://localhost:4000',
        changeOrigin: true, 
        pathRewrite: {'^/api': ''}
    })
    );
};




















//responsible for proxying a request for one server to another server
//will proxy request from localhost:4000 to localhost:3000