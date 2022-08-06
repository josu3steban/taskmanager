const { response } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require('../models')


const checkAuth = async( req, res=response, next ) => {
    const token = req.header('Authorization');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene la autorización para realizar esta acción'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETKEY );
        const user  = await User.findById( uid ).select('-password -confirmed -token -__v -createdAt -updatedAt');

        if( !user ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene la autorización para realizar esta acción'
            });
        }

        req.user = user;

        next();
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al validar el token'
        });
    }
}


module.exports = {
    checkAuth
}