const { request, response } = require('express');

// Controller for handling a bad routing request
const getError404 = ( req = request, res = response ) => {
    res.render('pages/404');
}

module.exports = {
    getError404
}