var express = require('express');

module.exports = function() {
var app = express();
process.env.PORT;

app.use(express.static('./public'));
return app;

};
