var express = require('express');
var proxy = require('http-proxy-middleware');
var path = require('path');
var serveStatic = require('serve-static');

console.log('URL:' + process.env.API_URL)

app = express();
app.use(serveStatic(__dirname + "/dist"));
// app.use(
//   '/api/',
//   proxy({ 
//     target: process.env.HOST, changeOrigin: true ,
//     pathRewrite: function (path, req) { return path.replace('/api/', process.env.HOST) }
//   })
// );

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);