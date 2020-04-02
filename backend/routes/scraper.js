var express = require('express');
var ProjectController = require('../controllers/scraper');

var router = express.Router();

//Routes
router.get('/searchDafiti/:marca?', ProjectController.searchDafiti);
router.get('/searchNetshoes/:marca?', ProjectController.searchNetshoes);
router.get('/detailDAFITI/:id', ProjectController.productDetailsDafiti);
router.get('/detailNETSHOES/:id', ProjectController.productDetailsNetshoes);

module.exports = router;