module.exports = (app) => {
    const Quizz = require('../controllers/quizz.controller.js')
    
    app.post('/quizz/create', Quizz.createQuizz)
    app.put('/quizz/update/:Id', Quizz.editQuizz)
    app.get('/quizz', Quizz.getAllQuizz)
    app.get('/quizz/:Id', Quizz.findQuizzById)
    app.delete('/quizz/disable/:Id', Quizz.disableQuizz)
    app.delete('/quizz/delete/:Id', Quizz.deleteQuizz)
}