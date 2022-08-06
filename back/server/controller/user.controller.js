const { response } = require("express");
const bcryptjs = require('bcryptjs');

const { User } = require("../models");
const { generateTemporalToken, generateJWT } = require("../helpers");
const { emailRegister } = require("../helpers/email");


const getUsers = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'get users'
    });
    
}


const createUser = async( req, res = response ) => {

    const { name, username, email, password } = req.body;

    try {
        const newUser = new User({ name, username, email, password });

        newUser.password = bcryptjs.hashSync( password, 10 );
        newUser.token = generateTemporalToken();

        await newUser.save();

        emailRegister({
            name    : newUser.name,
            email   : newUser.email,
            token   : newUser.token
        });
        
        res.json({
            ok: true,
            msg: 'Usuario creado correctamente. Revisa tu correo para confirmar tu cuenta',
            user: newUser,
        });
    }catch( error ) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        });
    }
    
}


module.exports = {
    getUsers,
    createUser
}