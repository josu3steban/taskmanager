const { Router } = require('express');
const { check } = require('express-validator');
const { getTasks, getTaskById, updateTask, deleteTask, createTask } = require('../controller');
const { validatePriority } = require('../helpers');
const { validateFields, validateCreateTask, validateTaskById } = require('../middleware');
const { checkAuth } = require('../middleware/check-auth');

const router = Router();


router.get('/', getTasks);

router.get('/:id', [
    checkAuth,
    check('id', 'El id no es válido').isMongoId(),
    validateFields,
    validateTaskById
],getTaskById);

router.post('/', [
    checkAuth,
    check('name', 'El nombre es requerido').notEmpty(),
    check('description', 'La descripción es requerida').notEmpty(),
    check('delivery', 'Debe ingresar la fecha de entrega').isDate(),
    check('priority', 'Se requiere elegir la prioridad').notEmpty(),
    check('priority').custom( validatePriority ),
    check('project', 'El id del proyecto no es válido').isMongoId(),
    validateFields,
    validateCreateTask
], createTask);

router.put('/:id', [
    checkAuth,
    check('id', 'El id no es válido').isMongoId(),
    validateFields,
    validateTaskById
],updateTask);

router.delete('/:id', [
    checkAuth,
    check('id', 'El id no es válido').isMongoId(),
    validateFields,
    validateTaskById
],deleteTask);

module.exports = router;