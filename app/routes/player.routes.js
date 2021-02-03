module.exports = (app) => {
    const Player = require('../controllers/player.controller.js')
    
    app.post('/player/create', Player.createPlayer)
    app.put('/player/update/:Id', Player.editPlayer)
    app.get('/player', Player.getAllPlayer)
    app.get('/player/:Id', Player.findPlayerById)
    app.delete('/player/disable/:Id', Player.DeletePlayer)
}