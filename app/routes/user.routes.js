module.exports = (app) => {
    const user = require('../controllers/user.controller.js')
    
    app.post('/user/create', user.createUser)
    app.put('/user/edit/:Id', user.editUser)
    app.get('/user', user.getAllUser)
    app.get('/user/:Id', user.getUserById)
    app.delete('/user/delete/:Id', user.deleteUser)
}