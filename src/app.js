const express= require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./config/cron/cronjobs')
require('./config/cron/croncallgeneral')




const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;