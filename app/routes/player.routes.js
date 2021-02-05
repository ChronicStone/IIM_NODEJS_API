module.exports = (app) => {
    const Player = require('../controllers/player.controller.js')
    const authJwt = require("../middlewares/authJwt.middleware")

    app.post('/player/create', Player.createPlayer)
    app.post('/player/auth', Player.playerAuth)
    app.get('/player', Player.getAllPlayers)
    app.get('/player/:playerId', Player.getPlayerById)
    app.delete('/player/delete/:playerId', Player.deletePlayer)
}