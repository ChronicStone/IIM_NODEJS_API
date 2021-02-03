module.exports = (app) => {
    const user = require('../controllers/user.controller.js')
    
    app.post('/user/create', User.createUser)
    app.put('/user/update/:Id', User.editUser)
    app.get('/user', User.getAllUser)
    app.get('/user/:Id', User.findUserById)
    app.delete('/user/delete/:Id', User.deleteUser)
}