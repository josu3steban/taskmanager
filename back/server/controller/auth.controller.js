const { response } = require("express");
const bcryptjs = require('bcryptjs');

const { generateJWT, generateTemporalToken, emailForgotPassword } = require("../helpers");
const { User } = require("../models");



const authLogin = async( req, res=response ) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            msg: 'Inció de sesión exitoso',
            user,
            token
        });
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


const confirmAccount = async( req, res=response ) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ token });
        user.confirmed = true;
        user.token = '';
        await user.save();

        return res.json({
            ok: true,
            msg: 'Cuenta confirmada'
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


const resetPaswordToken = async( req, res=response ) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        user.token = generateTemporalToken();
        await user.save();

        emailForgotPassword({
            name    : user.name,
            email   : user.email,
            token   : user.token
        });

        return res.json({
            ok: true,
            msg: 'Se ha enviado un correo para reestablecer tu contraseña'
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


const confirmTokenToResetPassword = async( req, res=response ) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ token });
        
        return res.json({
            ok: true,
            msg: 'Token válido para reestablecer la contraseña'
        });
    }catch( error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


const resetPasword = async( req, res=response ) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({ token });
        user.password = bcryptjs.hashSync( password, 10 );
        user.token = '';
        await user.save();

        return res.json({
            ok: true,
            msg: 'Contraseña reestablecida'
        });
    }catch( error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
};


const revalidateToken = async( req, res=response ) => {
    const {name, username, email, id } = req.user;
    const token = await generateJWT( id );
    const user = {
        name,
        username,
        email,
        uid: id,
    };

    return res.json({
        ok: true,
        user,
        token
    });
}


module.exports = {
    authLogin,
    confirmAccount,
    resetPaswordToken,
    confirmTokenToResetPassword,
    resetPasword,
    revalidateToken
}