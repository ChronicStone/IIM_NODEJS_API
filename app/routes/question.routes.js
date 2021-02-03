module.exports = (app) => {
    const Question = require('../controllers/question.controller.js')
    
    app.post('/question/create', Question.createQuestion)
    app.put('/question/update/:Id', Question.editQuestion)
    app.delete('/question/delete/:Id', Question.deleteQuestion)
}