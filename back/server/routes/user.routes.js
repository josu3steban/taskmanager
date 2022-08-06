const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser } = require('../controller');


const { existUsername, existEmail } = require('../helpers');
const { validateFields } = require('../middleware');

const router = Router();

router.get('/', getUsers);

router.post( '/register',[
    check('name', 'El nombre es requrido').notEmpty(),
    check('password', 'La contraseña debe de tener al menos 6 caracteres').isLength({ min: 6 }),
    check('username', 'El username es necesario').notEmpty(),
    check('username').custom( existUsername ),
    check('email', 'Ingrese un email válido').isEmail(),
    check('email').custom( existEmail ),
    validateFields
], createUser );


module.exports = router;