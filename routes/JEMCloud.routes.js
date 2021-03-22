const router = require('express').Router();

const getHome = require('../controllers/JEMCloud.controllers'); 

/**
 * Get routes
 */
router.get('/', getHome );


module.exports = router;