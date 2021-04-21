const router = require('express').Router();

const { JEMCloudController } = require('../controllers/index'); 

/**
 * Get routes
 */
router.get('/', JEMCloudController );


module.exports = router;