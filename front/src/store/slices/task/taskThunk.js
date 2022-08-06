import io from 'socket.io-client'
import Swal from "sweetalert2";
import { fectchWithToken } from "../../../helpers/fectch"
import { task_addTask, task_ClearActiveTask, task_DeleteTask, task_UpdateTask } from "./taskSlice";


let socket = io(import.meta.env.VITE_BASE_API_URL);

export const task_socketAdd = (task) => {
    return (dispatch) => {

        dispatch( task_addTask(task) );
    }
};

export const task_socketDelete = ( id ) => {
    return (dispatch) => {
        dispatch( task_DeleteTask(id) );
        dispatch( task_ClearActiveTask() );
    }
};

export const task_socketUpdate = ( task ) => {
    return (dispatch) => {
        dispatch( task_UpdateTask(task) );
    }
};



export const task_startAddTask = ( task ) => {
    return async( dispatch ) => {

        // let socket = io(import.meta.env.VITE_BASE_API_URL);

        // console.log(socket)

        const response = await fectchWithToken('task', task, 'POST');
        const body = await response.json();

        if( body.ok ) {

            // dispatch( task_addTask(body.task) );

            socket.emit('new task', body.task);

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1000
            });

        }else {

            const errors = body.errors ?? "";
            const error = body.error ?? "";

            Swal.fire({
                title   : 'Error',
                text    : !!errors ? errors.errors.map(err => err.msg) : error.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });

            
        }
        
    }
};


export const task_startChangeStatusTask = ( id, status ) => {
    return async( dispatch ) => {

        const response = await fectchWithToken(`task/${id}`, {status}, 'PUT');
        const body = await response.json();

        if( body.ok ) {

            // dispatch( task_UpdateTask( body.task ) );

            socket.emit('update task', body.task);
            
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


export const task_startUpdateTask = ( id, task ) => {
    return async( dispatch ) => {

        const response = await fectchWithToken(`task/${id}`, task, 'PUT');
        const body = await response.json();

        if( body.ok ) {

            // dispatch( task_UpdateTask(body.task) );

            socket.emit('update task', body.task);

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1000
            });

        }else {

            const errors = body.errors ?? "";
            const error = body.error ?? "";

            Swal.fire({
                title   : 'Error',
                text    : !!errors ? errors.errors.map(err => err.msg) : error.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });
            
        }
        
    }
};


export const task_startDeleteTask = ( id ) => {
    return async( dispatch ) => {

        const response = await fectchWithToken(`task/${id}`, {}, 'DELETE');
        const body = await response.json();

        if( body.ok ) {

            // dispatch( task_DeleteTask(id) );
            // dispatch( task_ClearActiveTask() );

            socket.emit('delete task', body.task);

            Swal.fire({
                position: 'top-end',
                icon    : 'success',
                title   : body.msg,
                showConfirmButton: false,
                timer   : 1000
            });

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