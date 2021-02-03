module.exports = (app) => {
    
    require('./player.routes.js')(app)
    require('./quizz.routes.js')(app)
    require('./user.routes.js')(app)
    require('./playerScore.routes.js')(app)
    require('./question.routes.js')(app)
}