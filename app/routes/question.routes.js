module.exports = (app) => {
    const Question = require('../controllers/question.controller.js')
    const authJwt = require("../middlewares/authJwt.middleware")

    app.post('/question/create', authJwt.verifyToken, Question.createQuestion)
    app.put('/question/edit/:questionId', Question.editQuestion)
    app.delete('/question/delete/:questionId', Question.deleteQuestion)
}