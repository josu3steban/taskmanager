const { response } = require("express");
const { Task, Project, User } = require('../models')

const getTasks = async( req, res=response ) => {

    try {
        res.json({
            ok: true,
            msg: 'Correcto'
        });
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const getTaskById = async( req, res=response ) => {
    const { id } = req.params;

    try {
        const task = await Task.findById( id );
        
        res.json({
            ok: true,
            task
        });
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const createTask = async( req, res=response ) => {
    const { name, description, priority, delivery, project } = req.body;
    
    try {
        const task = new Task({
            name,
            description,
            priority,
            delivery,
            project
        });
        
        await task.save();
        
        await Project.findByIdAndUpdate(project, {$push: { tasks: task._id }}, { new: true });
        
        res.json({
            ok: true,
            msg: 'Tarea creada correctamente',
            task
        });
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const updateTask = async( req, res=response ) => {

    const { id: uid } = req.user;
    const { id } = req.params;
    const { name, description, priority, delivery, status  } = req.body;
    try {
        const task = await Task.findById( id );
        const data = {
            name        : name        ?? task.name,
            priority    : priority    ?? task.priority,
            delivery    : delivery    ?? task.delivery,
            description : description ?? task.description,
            status      : status      ?? task.status,

            complete    : (status===true) ? uid : (status===false) ? null : task.complete
        }

        const taskUpdated = await Task.findByIdAndUpdate( id, data, { new: true }).populate('complete', 'name');

        res.json({
            ok: true,
            msg: 'La tarea se actualizó',
            task: taskUpdated
        });
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const deleteTask = async( req, res=response ) => {
    const { id } = req.params;
    try {

        const task = await Task.findByIdAndDelete( id, { new: true });

        res.json({
            ok: true,
            msg: 'Tareas eliminada',
            task
        });
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}