const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const JEMClouder = require('../models/JEMClouder');
const generateJWT = require('../helpers/generateJWT');
const cookieConfig = require('../helpers/cookieConfig');

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

const postSignUp = async ( req = request, res = response ) => {

    const { name, email, password } = req.body;
    const jemclouder = new JEMClouder({ name, email, password });
    
    const salt = bcryptjs.genSaltSync();
    jemclouder.password = bcryptjs.hashSync(password, salt);

    await jemclouder.save();

    const token = await generateJWT( jemclouder.id );

    res.cookie('jemclouder', token, cookieConfig);

    res.redirect('/profile');

}

const postSignIn = async ( req = request, res = response ) => {

    const { email, password } = req.body;

    try {

        const jemclouder = await JEMClouder.findOne({ email });

        if ( !jemclouder ) {
            return res.status(400).json({
                error: 'The email does not exist'
            });
        }

        const { state } = jemclouder;

        if ( !state ) {
            return res.status(400).json({
                error: 'The user is not active'
            });
        }

        const nPass = bcryptjs.compareSync( password, jemclouder.password );

        if ( !nPass ) {
            return res.status(400).json({
                error: 'The password does not match'
            });
        }

        const token = await generateJWT( jemclouder.id );

        res.cookie('jemclouder', token, cookieConfig);

        res.redirect('/profile');

    } catch (err) {
        
        console.log(err);
        res.status(500).json({
            msg: 'Error in the sign-in process, talk to the backend dev'
        });
    }
    
}

module.exports = {
    getSignUp,
    getSignIn,
    postSignUp,
    postSignIn
}