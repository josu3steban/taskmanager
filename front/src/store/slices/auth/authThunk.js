import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { fectchWithoutToken, fectchWithToken } from '../../../helpers/fectch';
import { clearActiveProject, clearProject } from '../project/projectSlice';
import { login, logout } from './authSlice';


export const stratChecking = () => {
    return async( dispatch ) => {
        const response = await fectchWithToken('auth/revalidate', {}, 'GET' );
        const body = await response.json();
        
        if( body.ok ) {
            localStorage.setItem( 'token', body.token );
            dispatch( login( body.user ) );
        }else {
            dispatch( logout() );
        }
    }
};

export const stratRegister = ({ name, username, email, password } ) => {
    return async( dispatch ) => {
        const data = {name, username, email, password};
        const response = await fectchWithoutToken('user/register', data, 'POST');
        const body = await response.json();

        if( body.ok ) {
            // localStorage.setItem('token', body.token);
            Swal.fire({
                title   : body.msg,
                icon    : 'success',
                confirmButtonText: 'Aceptar',
            });

            window.location = `/auth/`;
            
        }else {
            dispatch( logout() );
            
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

//CONFIRMA LA CUENTA MEDIANTE UN TOKEN
export const startConfirmAccount = ( token ) => {
    return async( dispatch ) => {
        const response = await fectchWithoutToken( `auth/account/confirm/${token}`, {}, 'GET' );
        const body = await response.json();

        if( body.ok ) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: body.msg,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: body.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
};

//ENVIAR EMAIL PARA GENERAR UN TOKEN PARA PODER CREAR UNA NUEVA CONTRASEÑA
export const startForgotPassword = ( {email} ) => {
    return async( dispatch ) => {
        const data = { email }
        const response = await fectchWithoutToken( 'auth/account/reset-password', data, 'POST' );
        const body = await response.json();

        if( body.ok ) {

            Swal.fire({
                title   : body.msg,
                icon    : 'success',
                confirmButtonText: 'Aceptar',
            });

            window.location = `/auth/`;
            
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

//ESTABLECER LA NUEVA CONTRASEÑA MEDIANTE UN TOKEN
export const startNewPassword = ( token, {password} ) => {
    return async( dispatch ) => {
        const data = { password }
        
        const response = await fectchWithoutToken(`auth/account/reset-password/${token}`, data, 'POST');
        const body = await response.json();

        if( body.ok ) {
            Swal.fire({
                title   : body.msg,
                icon    : 'success',
                confirmButtonText: 'Aceptar',
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


export const startLogin = ({ email, password }) => {
    return async( dispatch ) => {
        const data = {email, password};
        const response = await fectchWithoutToken('auth/login', data, 'POST');
        const body     = await response.json();

        if( body.ok ) {
            
            localStorage.setItem('token', body.token);
            
            dispatch( login( body.user ) );
            
        }else {
            Swal.fire({
                title   : 'Error',
                text    : body.msg,
                icon    : 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }
}

export const startLogout = () => {
    return ( dispatch ) => {
        dispatch( logout() );
        dispatch( clearActiveProject() );
        dispatch( clearProject() );

        localStorage.clear();
    }
}