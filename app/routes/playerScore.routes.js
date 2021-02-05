module.exports = (app) => {
    const PlayerScore = require('../controllers/playerScore.controller.js')
    const authJwt = require("../middlewares/authJwt.middleware")

    app.post('/playerScore/create', authJwt.verifyToken, PlayerScore.createPlayerScore)
    app.get('/playerScore', PlayerScore.getAllPlayerScore)
    app.get('/playerScore/:playerId', PlayerScore.getPlayerScoresByPlayerId)
    app.get('/playerScore/:playerId/:playerScoreId', PlayerScore.getPlayerScoresByScoreId)
}