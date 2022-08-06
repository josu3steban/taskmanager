const jwt = require("jsonwebtoken");


const generateJWT = ( uid ) => {
    const payload = { uid };

    return new Promise( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRETKEY, { expiresIn: '5h' }, (error, token) => {

            (error)
                ? reject('Ocurrió un error al generar el token')
                : resolve( token );

        });
        
    });

}

module.exports = { generateJWT }