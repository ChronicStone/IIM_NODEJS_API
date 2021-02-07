module.exports = (app) => {
    const PlayerScore = require('../controllers/playerScore.controller.js')
    const authJwt = require("../middlewares/authJwt.middleware")

    app.post('/playerScore/create', PlayerScore.createPlayerScore)
    app.get('/playerScore', PlayerScore.getAllPlayerScore)
    app.get('/playerScore/:playerScoreId', PlayerScore.getPlayerScoresByScoreId)
}