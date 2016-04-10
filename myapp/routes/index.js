var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Practica 7", title1: "Comma separated values"});
});

router.post('/csv',function(req,res,next)
{
    var contenido = req.body.original;
    res.render('resultado', { resultado: contenido });
});
module.exports = router;
