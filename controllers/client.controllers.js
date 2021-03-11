const { request, response } = require('express');

// Controller to render the home.hbs file and serve it on / request
const getHome = ( req = request, res = response ) => {
    res.render('home', {
        nombre: 'Home'
    });
}

// Controller to render the sign-in.hbs file and serve it on /sign-in request
const getSignIn = ( req = request, res = response ) => {
    res.render('pages/sign-in', {
        nombre: 'Sign In'
    });
}

// Controller to render the sign-up.hbs file and serve it on /sign-up request
const getSignUp = ( req = request , res = response ) => {
    res.render('pages/sign-up', {
        nombre: 'Sign Up'
    });
}

module.exports = {
    getHome,
    getSignIn, 
    getSignUp
}