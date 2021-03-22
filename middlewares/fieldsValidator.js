const { validationResult  } = require('express-validator');
const { request, response } = require('express');
const JEMCLouder = require('../models/JEMClouder')

const validateFields = ( req = request, res = response, next) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(404).json(errors);
    }

    next();
}

const emailExists = async ( email = '' ) => {

    const userWithEmail = await JEMCLouder.findOne({ email });

    if (  userWithEmail ) {
        throw new Error(`The email ${ email } is already in use`)
    }
}

module.exports = {
    validateFields,
    emailExists
}