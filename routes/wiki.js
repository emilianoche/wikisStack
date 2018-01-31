var express = require('express');
var router = express.Router();
var models = require('../models')
var User = models.User;
var Page = models.Page;

router.get('/', function (req, res, next) {

  res.redirect('/');
});

router.get('/add', function (req, res, next) {
  res.render('addpage')
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } ,
    include: [
        {model: User, as: 'author'}
    ]
  })
  .then(function(page){
    console.log(page)
    res.render('wikipage', {page: page});
  })
  .catch(next);
});

router.post('/add', function (req, res, next) {

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {
    var user = values[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });
    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function (page) {
    res.redirect(page.urlTitle);
  })
  .catch(next);
});

module.exports = router