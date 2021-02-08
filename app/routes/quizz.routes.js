module.exports = (app) => {
    const Quizz = require('../controllers/quizz.controller.js')
    const authJwt = require("../middlewares/authJwt.middleware")

    app.post('/quizz/create', authJwt.verifyToken, Quizz.createQuizz)
    app.put('/quizz/edit/:quizzId', Quizz.editQuizz)
    app.get('/quizz', Quizz.getAllQuizz)
    app.get('/quizz/:quizzId', Quizz.getQuizzById)
    app.delete('/quizz/disable/:quizzId', Quizz.disableQuizz)
    app.delete('/quizz/delete/:quizzId', Quizz.deleteQuizz)
   
}