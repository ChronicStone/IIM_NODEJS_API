const db = require("../models")

exports.createQuestion = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing license ID as parameter"})
        return;
    }

    db.Question.create({
        license_id: req.body.license_id,
        Question_number: req.body.Question_number,
        title: req.body.title,
        summary: req.body.summary
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editQuestion = (req, res) => {

}

exports.deleteQuestion = (req, res) => {
    if(!req.params.QuestionId) {
        res.send({success: false, message: "Missing Question ID as parameter"})
        return;
    }

    db.page.destroy({
        where: {
            Question_id: req.params.QuestionId
        }
    }).then(() => {
        db.Question.destroy({
            where: {
                id: req.params.QuestionId
            }
        }).then(() => {
            res.send({success: true})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err.message})
        })
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}