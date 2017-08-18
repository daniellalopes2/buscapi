var express = require('express');

module.exports = function() {
var app = express();
let port = process.env.PORT || 3000;
app.set('port', port);

app.use(express.static('./public'));
return app;

};
