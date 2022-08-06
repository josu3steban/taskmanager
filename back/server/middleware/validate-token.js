const { response } = require("express");
const { User } = require("../models");



const existUserTemporalToken = async( req, res=response, next ) => {
    const { token } = req.params;

    if( !token ) {
        return res.status(400).json({
            ok: false,
            msg: 'Se requiere un token'
        });
    }

    try {
        const user = await User.findOne({ token });

        if( !user ) {
            return res.status(403).json({
                ok: false,
                msg: 'El token no es válido'
            });
        }
        next();
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

module.exports = { existUserTemporalToken }