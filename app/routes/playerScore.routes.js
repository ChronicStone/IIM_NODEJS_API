module.exports = (app) => {
    const PlayerScore = require('../controllers/playerScore.controller.js')

    app.post('/playerScore/create', PlayerScore.createPlayerScore)
    app.put('/playerScore/edit/:Id', PlayerScore.editPlayerScore)
    app.get('/playerScore', PlayerScore.getAllPlayerScore)
    app.get('/playerScore/:Id', PlayerScore.getPlayerScoreById)
    app.delete('/playerScore/delete/:Id', PlayerScore.deletePlayerScore)
}