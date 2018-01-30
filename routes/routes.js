var express = require('express');
var routes = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
// ...
routes.use('/wiki', wikiRouter);


routes.get('/', function(req, res){
    res.render('index')
})

module.exports = routes