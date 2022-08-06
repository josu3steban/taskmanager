const { response } = require("express");
const { User, Project } = require("../models");



const getCollaborator = async(req, res=response) => {

    const { username } = req.body;
    
    try{

        const user = await User.findOne({ username });

        res.json({
            ok: true,
            user
        });

    }catch(error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });

    }
    
};

const addCollaborator = async(req, res=response) => {
    
    const { id }       = req.params;
    const { username } = req.body;
    
    try{

        const user = await User.findOne({ username });
        const project = await Project.findByIdAndUpdate(id, { $push:{collaborators: user._id} });

        res.json({
            ok: true,
            msg: 'Colaborador agregado!'
        });

    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
    
};

const deleteCollaborator = async(req, res=response) => {

    const { id } = req.params;
    const { username } = req.body;
    
    try{
        const user = await User.findOne({ username });
        const collaborator = await Project.findByIdAndUpdate(id, { $pull:{collaborators: user._id} }, {new: true});

        res.json({
            ok: true,
            msg: 'Colaborador eliminado!',
            user
        });

    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error inesperado'
        });
    }
    
};


module.exports = {
    getCollaborator,
    addCollaborator,
    deleteCollaborator
}