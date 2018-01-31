var express = require('express');
var routes = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
var models = require('../models')
var Page = models.Page;

routes.use('/wiki', wikiRouter);


routes.use('/users', userRouter);


routes.get('/', function (req, res) {
    Page.findAll()
        .then(function (pages) {
            console.log(pages)
            res.render('index', { pages: pages })
        })
})

module.exports = routes