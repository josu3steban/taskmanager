require('dotenv').config();
const { Server } = require('./server/models');

const { Server: ServerIO } = require('socket.io');

const server = new Server();

const serverSocket = server.listen();

const io = new ServerIO( serverSocket , {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

io.on('connection', (socket) => {
    
    socket.on('open project', (projectId) => {
        socket.join(projectId);
    });

    socket.on('new task', (task) => {
        socket.to(task.project).emit('add task', task);
    });

    socket.on('delete task', (task) => {
        socket.to(task.project).emit('delete task', task._id);
    });

    socket.on('update task', (task) => {
        socket.to(task.project).emit('update task', task);
    });
    
})
