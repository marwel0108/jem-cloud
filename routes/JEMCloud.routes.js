const router = require('express').Router();

const getHome = require('../controllers/index'); 

/**
 * Get routes
 */
router.get('/', getHome );


module.exports = router;