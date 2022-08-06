const { response } = require("express");
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');

const { User, Project, Task } = require("../models");


//validar errores del express validator
const validateFields = ( req, res=response, next ) => {

    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors
        });
    }

    next();
}

//Validar si existe el usuario y contraseña y si la cuenta ha sido confirmada
const validateEmailAndPassword = async( req, res=response, next ) => {
    const { email, password } = req.body;

    try{

        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecto'
            });
        }

        const isValidPassword = bcryptjs.compareSync( password, user.password );

        if( !isValidPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecto'
            });
        }

        if( !user.confirmed ) {
            return res.status(400).json({
                ok: false,
                msg: 'La cuenta no ha sido confirmada'
            });
        }

        next();
        
    }catch( error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


//validar si los proyectos de un usuario existe
const validateProjects = async( req, res=response ) => {
    const { id } = req.user;

    try {
        const projects = await Project.find({ creator: id });

        if( !projects ) {
            return res.status(404).json({
                ok: false,
                msg: `No tiene ningún proyecto creado`
            });
        }
    }catch( error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


//validar si proyecto buscado por id existe en el usuario
const validateProjectById = async( req, res=response, next ) => {
    const { id: uid } = req.user;
    const { id } = req.params;

    try {
        const project = await Project.findById( id );

        if( !project ) {
            return res.status(404).json({
                ok: false,
                msg: `No existe el proyecto con el id: ${ id }`
            });
        }

        if( project.creator.toString() !== uid.toString() && !project.collaborators.some( collab => collab._id.toString() === uid.toString()) ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización para este proyecto'
            });
        }
        
        next();
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


const validateCreateTask = async( req, res=response, next ) => {
    const { id: uid } = req.user;
    const { project } = req.body;

    if( !project ) {
        return res.status(400).json({
            ok: false,
            msg: 'Se requiere el id del proyecto'
        });
    }

    if( !uid ) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al válidar el usuario'
        });
    }

    try {
        const projectSearch = await Project.findById( project );

        if( !projectSearch ) {
            return res.status(404).json({
                ok: false,
                msg: `No existe el proyecto con el id ${project}`
            });
        }

        if( projectSearch.creator.toString() !== uid.toString() ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene la autorización para realizar esta acción'
            });
        }

        next();
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}


const validateTaskById = async( req, res=response, next ) => {
    const { id } = req.params;
    const { id: uid } = req.user;

    if( !id ) {
        return res.status(400).json({
            ok: false,
            msg: 'Se requiere el id de la tarea'
        });
    }

    try {
        const task = await Task.findById( id ).populate('project');

        if( !task ) {
            return res.status(404).json({
                ok: false,
                msh: `No existe la tarea con el id: ${ id }`
            });
        }

        if( task.project.creator.toString() !== uid.toString() && !task.project.collaborators.some(collab => collab._id.toString() === uid.toString()) ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene la autorización para realizar la acción'
            });
        }

        next();
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
};


//VALIDACIONES PARA COLLABORADORES
const validateUsername = async( req, res=response, next ) => {

    const { username } = req.body;

    if(!username) {
        return res.status(404).json({
            ok: false,
            msg: `Debe de ingresar un nombre de usuario`
        });
    }

    try {

        const user = await User.findOne({username});

        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: `El nombre de usuario: ${username} no existe`
            });
        }

        next();

    }catch(error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });

    }

};

const validateAddCollaborator = async(req, res = response, next ) => {

    const { _id }           = req.user;
    const { username }      = req.body;
    const { id: projectId } = req.params;

    if(!username) {
        return res.status(404).json({
            ok: false,
            msg: `Debe de ingresar un nombre de usuario`
        });
    }

    if(!projectId) {
        return res.status(404).json({
            ok: false,
            msg: `El id del proyecto es requerido`
        });
    }

    try {

        const user    = await User.findOne({username});
        const project = await Project.findById( projectId );

        if( project.creator.toString() !== _id.toString() ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene la autorización para agregar colaboradores'
            });
        }

        if( project.creator.toString() === user.id.toString() ) {
            return res.status(400).json({
                ok: false,
                msg: 'No puedes agregarte como colaborador a tu propio proyecto'
            });
        }

        if( project.collaborators.includes(user.id) ) {
            return res.status(400).json({
                ok: false,
                msg: `${user.username} ya ha sido agregado como colaborador`
            });
        }

        next();

    }catch(error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });

    }
    
};


const validateDeleteCollaborator = async(req, res = response, next ) => {

    const { _id }           = req.user;
    const { username }      = req.body;
    const { id: projectId } = req.params;

    if(!username) {
        return res.status(404).json({
            ok: false,
            msg: `Debe de ingresar un nombre de usuario`
        });
    }

    if(!projectId) {
        return res.status(404).json({
            ok: false,
            msg: `El id del proyecto es requerido`
        });
    }

    try {

        const user    = await User.findOne({username});
        const project = await Project.findById( projectId );

        if( project.creator.toString() !== _id.toString() ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene la autorización para agregar colaboradores'
            });
        }

        next();

    }catch(error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });

    }
    
};


module.exports = {
    validateFields,
    validateEmailAndPassword,
    validateProjects,
    validateProjectById,
    validateCreateTask,
    validateTaskById,
    validateUsername,
    validateAddCollaborator,
    validateDeleteCollaborator
}