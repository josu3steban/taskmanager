const nodemailer = require('nodemailer');


const emailRegister = async({ name, email, token }) => {

    //configuracion de cliente
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //información del email
    const information = await transport.sendMail({
        from    : '"TaskManager - Administrador de Proyectos" <josue_3steban@hotmail.com>',
        to      : email,
        subject : 'TaskManager - Confirma tu Cuenta',
        text    : 'Confirma tu cuenta de TaskManager',
        html    : `
            <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; text-transform: uppercase; font-size:20px; " >¡Hola, ${name}!😝 Ya estás pronto a obtener tu cuenta en TaskManager.</p>

            <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; text-transform: uppercase; font-size:20px; " >Solo te falta confirmar tu cuenta mediante el siguiente enlace</p>
        
            <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; text-transform: uppercase; font-size:20px; " >y podrás comenzar con tus proyectos.🤪</p>
        
            <div style="display:flex; justify-content: center; margin-top: 80px;">
                <a style="font-family: Arial, Helvetica, sans-serif; border-radius: 20px; font-size:25px; font-weight:bold; color:#EDF2F4; text-decoration:none; display:inline-block; padding:20px; background-color:#1D3557;" href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}" target="_blank">CONFIRMAR CUENTA 😎</a>
            </div>
            
        
            <p style="font-family: Arial, Helvetica, sans-serif; font-size:20px; margin-top: 100px;" >Si no creaste esta cuenta, puedes ignorar este mensaje.🤡</p>
        `
    });
}


const emailForgotPassword = async({ name, email, token }) => {

    //configuracion de cliente
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //información del email
    const information = await transport.sendMail({
        from    : '"TaskManager - Administrador de Proyectos" <josue_3steban@hotmail.com>',
        to      : email,
        subject : 'TaskManager - Reestablece tu Contraseña',
        text    : 'Reestablece tu Contraseña de TaskManager',
        html    : `
            <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; text-transform: uppercase; font-size:20px; " >Hola, ${name}.😀</p>

            <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; text-transform: uppercase; font-size:20px; " >Ups! Al parecer se te ha olvidado la contraseña de tu cuenta.😬</p>
        
            <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; text-transform: uppercase; font-size:20px; " >No te preocupes, dale click al boton de abajo y crea una nueva.😮‍💨</p>
        
            <div style="display:flex; justify-content: center; margin-top: 80px;">
                <a style="font-family: Arial, Helvetica, sans-serif; border-radius: 20px; font-size:25px; font-weight:bold; color:#EDF2F4; text-decoration:none; display:inline-block; padding:20px; background-color:#1D3557;" href="${process.env.FRONTEND_URL}/auth/new-password/${token}" target="_blank">Reestablecer Contraseña 😎</a>
            </div>
            
        
            <p style="font-family: Arial, Helvetica, sans-serif; font-size:20px; margin-top: 100px;" >Si no solicitaste esta acción, puedes ignorar este mensaje.🤡</p>
        `
    });
}


module.exports = {
    emailRegister,
    emailForgotPassword
}
