const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const Stores = require('../Controllers/Stores');
router.route('/stores')
  .get(Stores.getAllStores //function(){logger.info("pending validations")}, function(){logger.info("pending use case")}
);

router.route('/addStores')
  .post(Stores.addStores);


module.exports = router;
