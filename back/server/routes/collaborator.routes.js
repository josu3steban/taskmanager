const { Router } = require('express');
const { check } = require('express-validator');
const { addCollaborator, getCollaborator, deleteCollaborator } = require('../controller');
const { validateProject } = require('../helpers');
const { validateFields, validateUsername, validateAddCollaborator, validateDeleteCollaborator } = require('../middleware');
const { checkAuth } = require('../middleware/check-auth');

const router = Router();

router.post('/',[
    checkAuth,
    check('username', 'El nombre de usuario es requerido').notEmpty(),
    validateUsername,
    validateFields
], getCollaborator);

router.post('/:id',[
    checkAuth,
    check('id', 'El id del proyecto no es válido').isMongoId(),
    check('id').custom( validateProject ),
    check('username', 'El nombre de usuario es requerido').notEmpty(),
    validateUsername,
    validateAddCollaborator,
    validateFields

], addCollaborator);

router.delete('/:id',[
    checkAuth,
    check('id', 'El id del proyecto no es válido').isMongoId(),
    check('id').custom( validateProject ),
    check('username', 'El nombre de usuario es requerido').notEmpty(),
    validateUsername,
    validateDeleteCollaborator,
    validateFields

], deleteCollaborator);


module.exports = router;