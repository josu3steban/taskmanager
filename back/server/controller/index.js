const userController = require('./user.controller');
const authController = require('./auth.controller');
const projectController = require('./project.controller');
const taskController = require('./task.controller');
const collaborator = require('./collaborator.controller');

module.exports = {
    ...userController,
    ...authController,
    ...projectController,
    ...taskController,
    ...collaborator
}