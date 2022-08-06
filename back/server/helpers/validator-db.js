const { User, Project } = require('../models');


//VALIDACIONES DE USUARIO
const existEmail = async( email ) => {
    const emailDb = await User.findOne({ email });

    if( emailDb ) throw new Error(`El correo ${email} ya existe`);

    return true;
}

const existUsername = async( username ) => {
    const usernameDB = await User.findOne({ username });

    if( usernameDB ) throw new Error(`El username ${username} ya existe`);

    return true;
}

const existeUser = async( email ) => {
    const existeUser = await User.findOne({ email });

    if( !existeUser ) throw new Error(`No existe un acuenta con el email: ${ email }`);

    return true;
}


//VALIDACIONES PARA PROYECTOS
const validateProject = async( id ) => {

    const existProject = await Project.findById(id);

    if(!existProject) throw new Error(`No existe el proyecto con el id: ${id}`);

    return true;
    
};


//VALIDACIONES PARA TAREAS
const validatePriority = ( priority ) => {
    const availablePriorities = ['Baja', 'Media', 'Alta'];

    if( !availablePriorities.includes( priority ) ) {
        throw new Error(`No existe la prioridad ${priority}. Disponibles: ${availablePriorities}`);
    }

    return true;
};


module.exports = {
    existEmail,
    existUsername,
    existeUser,
    validatePriority,
    validateProject
}