const { Router } = require('express');
const { check } = require('express-validator');

const { authLogin, confirmAccount, resetPaswordToken, resetPasword, confirmTokenToResetPassword, revalidateToken } = require('../controller');
const { existeUser } = require('../helpers');
const { validateFields, validateEmailAndPassword, existUserTemporalToken } = require('../middleware');
const { checkAuth } = require('../middleware/check-auth');

const router = Router();

//iniciar sesión
router.post('/login', [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'Ingrese una contraseña válida').notEmpty(),
    validateFields,
    validateEmailAndPassword
], authLogin);


//confirmar cuenta meidnate correo electrónico
router.get('/account/confirm/:token', [
    check('token', 'Se requiere un token').notEmpty(),
    existUserTemporalToken
], confirmAccount);


//petición para reestablecer contraseña
router.post('/account/reset-password', [
    check('email', 'El email no es válido').isEmail(),
    check('email').custom( existeUser ),
    validateFields
], resetPaswordToken);


//confirmar el token enviado para reestablecer la contraseña
router.get('/account/reset-password/:token', existUserTemporalToken, confirmTokenToResetPassword);

//reestablecer la contraseña
router.post('/account/reset-password/:token', [
    check('token', 'Se requiere un token').notEmpty(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validateFields,
    existUserTemporalToken
], resetPasword);


//revalidar el token en caso de un checkin previo al abrir al app web
router.get('/revalidate', checkAuth, revalidateToken);

module.exports = router;