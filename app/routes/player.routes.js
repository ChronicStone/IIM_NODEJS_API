module.exports = (app) => {
    const Player = require('../controllers/player.controller.js')

    app.post('/player/create', Player.createPlayer)
    app.put('/player/edit/:Id', Player.editPlayer)
    app.get('/player', Player.getAllPlayer)
    app.get('/player/:Id', Player.getPlayerById)
    app.delete('/player/delete/:Id', Player.deletePlayer)
}