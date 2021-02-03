module.exports = (app) => {
    const Quizz = require('../controllers/quizz.controller.js')
    
    app.post('/quizz/create', Quizz.createQuizz)
    app.put('/quizz/edit/:id', Quizz.editQuizz)
    app.get('/quizz', Quizz.getAllQuizz)
    app.get('/quizz/:id', Quizz.getQuizzById)
    app.delete('/quizz/disable/:id', Quizz.disableQuizz)
    app.delete('/quizz/delete/:id', Quizz.deleteQuizz)
   
}