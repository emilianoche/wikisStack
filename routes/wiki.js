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
    } 
  })
  .then(function(page){
    res.render('wikipage', {page: page});
  })
  .catch(next);
});

router.post('/add', function (req, res, next) {
  // agregá definiciones para  `title` y `content`
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  // Asegurate que solo redirigimos **luego** que nuestro save esta completo!
  // nota:  `.save` devuelve una promesa o puede tomar un callback.
  page.save()
    .then(function (savedPage) {
      res.redirect(savedPage.urlTitle)
    })
  // -> después del save -> res.redirect('/');
});

module.exports = router