var express = require('express');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var env = nunjucks.configure('views', {noCache: true});



app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.listen(3000)