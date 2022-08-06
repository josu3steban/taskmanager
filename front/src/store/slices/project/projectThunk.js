import io from 'socket.io-client';
import Swal from "sweetalert2";
import { fectchWithToken } from "../../../helpers/fectch";
import { collab_loadCollaborator } from "../collaborator/collaboratorSlice";
import { task_LoadTasks } from "../task";
import { addProject, clearActiveProject, clearProject, deleteProject, getProjectById, projectsLoad, setActiveProject, updateProject } from "./projectSlice";



export const startProjectLoad = () => {
    return async( dispatch ) => {

        const response = await fectchWithToken('project', {} , 'GET');
        const body     = await response.json();

        if( body.ok ) {
            
            dispatch( projectsLoad(body.projects) );

        }else {

            Swal.fire({
                title   : 'Error',
                text    : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });
            
        }
        
    }
};


export const startAddProject = ( project ) => {
    return async( dispatch ) => {


        const response = await fectchWithToken('project', project, 'POST');
        const body = await response.json();

        if( body.ok ) {

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1500
            });

            dispatch( addProject(body.project) );

        }else {

            Swal.fire({
                title   : 'Error',
                text    : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });

        }
        
    }
};


export const startGetProjectById = ( id ) => {
    return async( dispatch ) => {

        const response = await fectchWithToken(`project/${id}`, {}, 'GET');
        const body     = await response.json();

        if( body.ok ) {

            dispatch( getProjectById(body.project) )
            dispatch( setActiveProject(body.project._id) );
            dispatch( task_LoadTasks(body.project.tasks) );
            dispatch( collab_loadCollaborator(body.project.collaborators) );

        }else {

            dispatch( clearProject() );

            Swal.fire({
                title   : 'Error',
                text    : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });

        }
        
    }
};



export const startUpdateProject = ( project ) => {
    return async(dispatch) => {

        const response = await fectchWithToken(`project/${project._id}`, project, 'PUT');
        const body = await response.json();

        if( body.ok ) {

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1500
            });

            dispatch( updateProject(body.project) );

        }else {

            Swal.fire({
                title   : 'Error',
                text    : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });

        }
        
    }
};


export const startDeleteProjet = ( id ) => {
    return async(dispatch) => {

        const response = await fectchWithToken(`project/${id}`, {}, 'DELETE');
        const body = await response.json();

        if( body.ok ) {

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1500
            });

            dispatch( deleteProject( id ) );
            dispatch( clearActiveProject() );

        }else {

            Swal.fire({
                title   : 'Error',
                text    : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });

        }
        
    }
};