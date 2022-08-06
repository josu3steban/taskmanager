const { Router } = require('express');
const { check } = require('express-validator');

const { checkAuth } = require('../middleware/check-auth');
const { getProjects, createProject, getProjectById, updateProject, deleteProject, addCollaborator, deleteCollaborator } = require('../controller');
const { validateFields, validateProjectById } = require('../middleware');

const router = Router();

//obtener todos los proyectos de un usuario
router.get('/', checkAuth, getProjects );

//obtener proyecto por id
router.get('/:id', [
    checkAuth,
    check('id', 'El id no es válido').isMongoId(),
    validateFields,
    validateProjectById
], getProjectById);

//crear un proyecto
router.post('/', [
    checkAuth,
    check('name', 'El nombre es requerido').notEmpty(),
    check('description', 'La descripción es necesaria').notEmpty(),
    check('client', 'El proyecto debe tener un cliente').notEmpty(),
    validateFields
], createProject);

//actualizar un proyecto por id
router.put('/:id', [
    checkAuth,
    check('id', 'El id no es válido').isMongoId(),
    validateFields,
    validateProjectById
], updateProject);

//eliminar proyecto
router.delete('/:id', [
    checkAuth,
    check('id', 'El id no es válido').isMongoId(),
    validateFields,
    validateProjectById
], deleteProject);

//agregar colaborador
router.post('/add-collaborator/:id', [
    checkAuth
], addCollaborator);

//eliminar colaborador
router.post('/delete-collaborator/:id', [
    checkAuth
], deleteCollaborator);

module.exports = router;