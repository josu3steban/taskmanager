const { response } = require("express");
const { Project, Task } = require("../models");


const getProjects = async( req, res=response ) => {

    const { id } = req.user;

    try {
        const projects = await Project.find({
            $or: [
                {collaborators: id},
                {creator: id}
            ]
        }).populate('creator', 'name').select('-tasks -collaborators');
        
        res.json({
            ok: true,
            projects
        });
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
    
}

const getProjectById = async( req, res=response ) => {
    const { id: uid } = req.user;
    const { id } = req.params;

    try {
        // const project = await Project.findById( id ).where('creator').equals( uid ).populate('creator tasks collaborators', 'name username email delivery description priority status');

        const project = await Project.findById( id ).populate('creator tasks collaborators', 'name delivery description priority status username email ').populate({path: 'tasks', populate: {path: 'complete', select: 'name'}});

        // const tasks = await Task.find({ project: project.id });
        
        res.json({
            ok: true,
            project
            // tasks
        });
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const createProject = async( req, res=response ) => {

    const { _id: uid } = req.user;
    const { name, description, client } = req.body;
    
    try {
        const newProject = {
            name, 
            description,
            client,
            creator: uid
        };

        const project = new Project( newProject );
        await project.save();

        res.status(201).json({
            ok: true,
            msg: 'Proyecto creado',
            project
        });
        
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    } 
}

const updateProject = async( req, res=response ) => {
    const { name, description, client, delivery } = req.body;
    const { id } = req.params;

    try {
        const project = await Project.findById( id );
        const data = {
            name        : name ?? project.name,
            client      : client ?? project.client,
            delivery    : delivery ?? project.delivery,
            description : description ?? project.description
        };
        const projectUpdated = await Project.findByIdAndUpdate( id, data, { new: true } );
        
        res.json({
            ok: true,
            msg: 'Proyecto actualizado',
            project: projectUpdated
        });
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const deleteProject = async( req, res=response ) => {
    const { id } = req.params;

    try {
        const project = await Project.findByIdAndDelete( id, { new: true });

        res.json({
            ok: true,
            msg: 'El proyecto ha sido eiminado',
            project
        });
    }catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const addCollaborator = async( req, res=response ) => {

}

const deleteCollaborator = async( req, res=response ) => {
    
}



module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator
}