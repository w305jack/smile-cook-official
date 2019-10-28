var express = require('express');
var proxy = require('http-proxy-middleware');
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');
var history = require('connect-history-api-fallback');

app = express();
app.use(cors());
app.use(serveStatic(__dirname + "/dist"));
// app.use(
//   '/api/',
//   proxy({ 
//     target: process.env.API_URL, changeOrigin: true ,
//     pathRewrite: function (path, req) { return path.replace('/api/', process.env.API_URL) }
//   })
// );
app.use(history());

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);