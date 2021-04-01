
const { validateFields, emailExists } = require('./fieldsValidator');
const validateJWT = require('./validateJWT')

module.exports = {
    validateFields,
    emailExists,
    validateJWT
}