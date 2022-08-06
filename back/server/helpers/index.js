const validatorDB = require('./validator-db');
const generateJWT = require('./generate-jwt');
const generateTemporalToken = require('./generate-temp-token');
const email = require('./email');

module.exports = {
    ...validatorDB,
    ...generateJWT,
    ...generateTemporalToken,
    ...email
}