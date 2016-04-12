var express = require('express');
var router = express.Router();
var calculate = require('../../assets/js/csv.js');

/* GET home page. */
//Se invoca el index. Utilizamos plantilla (/views/index.ejs)
router.get('/', function(req, res, next) {
  res.render('index', { title: "Practica 7", title1: "Comma separated values"});
});

//req.body --> capturar
//res.render --> redirige

router.post('/csv',function(req,res,next)
{
    var contenido = req.body.original;
    var r = calculate(contenido);
    res.render('resultado', { resultado: r });
});
module.exports = router;
