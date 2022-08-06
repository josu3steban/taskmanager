const express = require('express');

// const { Server: ServerIO } = require('socket.io');

const cors = require('cors');

const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conexión a BD
        this.dbConnection();

        //middlewares
        this.middlewares();

        //principal routes
        this.userRoute      = '/api/user';
        this.authRoute      = '/api/auth';
        this.projectRoute   = '/api/project';
        this.taskRoute      = '/api/task'
        this.collaboratorRoute = '/api/collaborator';

        //routes
        this.routes();
    }
    
    async dbConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use( this.userRoute, require('../routes/user.routes') );
        this.app.use( this.authRoute, require('../routes/auth.routes') );
        this.app.use( this.taskRoute, require('../routes/task.routes') );
        this.app.use( this.projectRoute, require('../routes/project.routes') );
        this.app.use( this.collaboratorRoute, require('../routes/collaborator.routes') );
    }

    middlewares() {
        //rutas de peticiones permitidas
        const whiteList = [process.env.FRONTEND_URL];

        const corsOption = {
            origin: function(origin, callback) {

                if(whiteList.includes(origin)) {
                    callback(null, true);
                }else {
                    callback(new Error('Error en CORS'));
                }
            }
        }
        
        
        this.app.use( cors( corsOption ) );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
        
    }
    

    listen() {
        return this.app.listen( this.port, () => console.log(`Corriendo en el puerto ${this.port}`) );


        // const io = new ServerIO( serverSocket , {
        //     pingTimeout: 60000,
        //     cors: {
        //         origin: process.env.FRONTEND_URL
        //     }
        // });
        
        // io.on('connection', (socket) => {
        //     console.log('SOCKET EVEEEEENTOOOOOO -----1')
            
        //     socket.on('open project', (projectId) => {
        //         socket.join(projectId);
        //         console.log('SOCKET EVEEEEENTOOOOOO-----2')
        //     });

        //     socket.on('new task', (task) => {
        //         socket.to(task.project).emit('add task', task);
        //         console.log('SOCKET EVEEEEENTOOOOOO-----3')
        //     });

        //     socket.on('delete task', (task) => {
        //         socket.to(task.project).emit('delete task', task._id);
        //         console.log('SOCKET EVEEEEENTOOOOOO-----4')
        //     });

        //     socket.on('update task', (task) => {
        //         socket.to(task.project).emit('update task', task);
        //         console.log('SOCKET EVEEEEENTOOOOOO-----5')
        //     });
            
        // })

    }

}

module.exports = Server;