
require('dotenv').config();
const { Router } = require('express');
const routerIndex = Router();

const adminCtrl = require('../controllers/admin.controllers');
const infoCtrl = require('../controllers/info.controllers')


//home
routerIndex.get('/',adminCtrl.getHome )
.get('/api/estadistica/general',infoCtrl.getGeneral)//todos los datos generales
.get('/api/estadistica/avaluos', infoCtrl.getAvaluosAll)//avaluo total, avaluo urbano, avaluo rural.
.get('/api/estadistica/predios', infoCtrl.getPrediosAll)//predios total. predios urbano, predios rural
.get('/api/estadistica/basepredial',infoCtrl.getBaseGrabableApi)
.get('/api/estadistica/propietarios', infoCtrl.getPropietariosAll)
.get('/api/estadistica/lotes', infoCtrl.getLotesAll)
.get('/api/estadisticas/comparebase', infoCtrl.getCompareBase)





module.exports = routerIndex;