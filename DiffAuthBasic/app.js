const mongoose = require('mongoose');
const logger = require('./utils/logger');
const mwBasicAuth = require('./controllers/basicAuth');
const bodyParser = require("body-parser")
mongoose.Promise = Promise;
const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
require('./utils/initializer').init()
app.use(mwBasicAuth);
app.use('/routes', require('./routes/stores'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./routes/stores'));

// Start the server
app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = app
