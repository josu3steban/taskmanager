const validateFields = require('./validate-fields');
const validateToken  = require('./validate-token');

module.exports = {
    ...validateFields,
    ...validateToken
}