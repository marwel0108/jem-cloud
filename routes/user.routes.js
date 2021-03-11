const router = require('express').Router();

const { 
    getProfile,
    getFolder,
    getFile
} = require('../controllers/user.controllers');

router.get('/', getProfile);

router.get('/folder', getFolder);

router.get('/file', getFile);

module.exports = router;