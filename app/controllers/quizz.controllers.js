const db = require("../models")

exports.createQuizz = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing quizz ID as parameter"})
        return;
    }

    db.Quizz.create({
        license_id: req.body.license_id,
        Quizz_number: req.body.Quizz_number,
        title: req.body.title,
        summary: req.body.summary
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editQuizz = (req, res) => {

}

exports.getAllQuizz = (req, res) => {

}

exports.getQuizzById = (req, res) => {

}

exports.deleteQuizz = (req, res) => {
    if(!req.params.QuizzId) {
        res.send({success: false, message: "Missing Quizz ID as parameter"})
        return;
    }

    db.Quizz.destroy({
        where: {
            Quizz_id: req.params.QuizzId
        }
    }).then(() => {
        db.Quizz.destroy({
            where: {
                id: req.params.QuizzId
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