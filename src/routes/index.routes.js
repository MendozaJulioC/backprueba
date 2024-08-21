const { Router } = require('express');
const routerIndex = Router();

const adminCtrl = require('../controllers/admin.controllers');
const infoCtrl = require('../controllers/info.controllers')

//home
routerIndex.get('/',adminCtrl.getHome )
.get('/api/lotes/general',infoCtrl.geLotesGeneral)




module.exports = routerIndex;