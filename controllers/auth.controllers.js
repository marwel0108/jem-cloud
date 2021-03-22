const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const JEMClouder = require('../models/JEMClouder');

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

const postUser = async ( req = request, res = response ) => {

    const { name, email, password } = req.body;
    const jemclouder = new JEMClouder({ name, email, password });
    
    const salt = bcryptjs.genSaltSync();
    jemclouder.password = bcryptjs.hashSync(password, salt);

    await jemclouder.save();

    res.json({
        jemclouder
    });

}

module.exports = {
    getSignUp,
    getSignIn,
    postUser
}