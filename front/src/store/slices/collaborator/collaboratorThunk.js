import Swal from "sweetalert2";
import { fectchWithToken } from "../../../helpers/fectch";
import { searchingFinish } from "../ui";
import { collab_clearollaborator, collab_delteCollaborator, collab_setCollaborator } from "./collaboratorSlice";


export const collab_startSearchCollaborator = ( id, username ) => {
    return async( dispatch ) => {

        const data = { username };

        const response = await fectchWithToken(`collaborator`, data, 'POST');
        const body = await response.json();

        if( body.ok ) {

            dispatch( collab_setCollaborator(body.user) );
            dispatch( searchingFinish() );
            
        }else {

            dispatch( collab_clearollaborator() );
            dispatch( searchingFinish() );
            
            const errors = body.errors ?? "";

            Swal.fire({
                title   : 'Error',
                text    : !!errors ? errors.errors.map(err => err.msg) : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });
            
        }
        
    }
};

export const collab_startAddCollaborator = ( projectId, username ) => {
    return async( dispatch ) => {

        const data = { username }

        const response = await fectchWithToken(`collaborator/${projectId}`, data, 'POST');
        const body = await response.json();

        if( body.ok ) {

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1000
            });

            dispatch( collab_clearollaborator() );
            
        }else {

            dispatch( collab_clearollaborator() );
            
            const errors = body.errors ?? "";

            Swal.fire({
                title   : 'Error',
                text    : !!errors ? errors.errors.map(err => err.msg) : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });
            
        }
        
    }
};


export const collab_startDeleteCollaborator = ( projectId, username ) => {
    return async( dispatch ) => {

        const data = { username }

        const response = await fectchWithToken(`collaborator/${projectId}`, data, 'DELETE');
        const body = await response.json();

        if( body.ok ) {

            dispatch( collab_delteCollaborator( body.user ) );

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1000
            });

        }else {

            const errors = body.errors ?? "";

            Swal.fire({
                title   : 'Error',
                text    : !!errors ? errors.errors.map(err => err.msg) : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });
            
        }
        
    }
};