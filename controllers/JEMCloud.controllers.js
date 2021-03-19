const { request, response } = require('express');

// Controller to render the home.hbs file and serve it on / request
const getHome = ( req = request, res = response ) => {
    res.render('home', {
        nombre: 'Home',
        homeState: 'active disabled'
    });
}

// Controller to render the sign-in.hbs file and serve it on /sign-in request
const getSignIn = ( req = request, res = response ) => {
    res.render('pages/sign-in', {
        nombre: 'Sign In',
        signInState: 'active disabled'
    });
}

// Controller to render the sign-up.hbs file and serve it on /sign-up request
const getSignUp = ( req = request , res = response ) => {
    res.render('pages/sign-up', {
        nombre: 'Sign Up',
        signUpState: 'active disabled'
    });
}

module.exports = {
    getHome,
    getSignIn, 
    getSignUp
}