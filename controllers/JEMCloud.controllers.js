const { request, response } = require('express');

// Controller to render the home.hbs file and serve it on / request
const getHome = ( req = request, res = response ) => {
    res.render('home', {
        nombre: 'Home',
        homeState: 'active disabled'
    });
}



module.exports = getHome;
