var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = express.Router();

routes.get('/', function(req, res){
    res.render('index')
})