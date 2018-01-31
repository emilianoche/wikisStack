var routes = require('./routes/routes');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var path = require('path');
var env = nunjucks.configure('views', {noCache: true});
var models = require('./models')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

models.User.sync({})
.then(function () {
    return models.Page.sync({})
}).then(function(){
    app.listen(3000)

})