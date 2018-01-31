
var express = require('express');
var router = express.Router();
var models = require('../models')
var User = models.User;
var Page = models.Page;


router.get('/:id',function(req,res,next){
    var userPromise = User.findById(req.params.id);
    var pagePromise = Page.findAll({
        where:{
            id: req.params.id
        }
    });
    Promise.all([
        userPromise,
        pagePromise
    ])
    .then((values) =>{
        var users =  values[0];
        var pages = values[1];
        console.log(pages)
        res.render('userpage',{users:users, pages:pages})
    })
})

module.exports = router