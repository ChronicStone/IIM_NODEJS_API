const db = require("../models")

exports.createQuestion = (req, res) => {
    if(!req.body.quizzId || !req.body.questionInput || !req.body.awnsers) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.question.create({
        quizzId: req.body.quizzId,
        questionInput: req.body.questionInput,
    }).then((questionData) => {
        Promise.all(req.body.awnsers.map(awnser => {
            return new Promise((resolve, reject) => {
                db.awnser.create({
                    questionId: questionData.id,
                    awnserInput: awnser.awnserInput,
                    isCorrectAwnser: awnser.isCorrectAwnser
                }).then((awnserData) => {
                    resolve(awnserData)
                }).catch((err) => {
                    reject(err.message)
                })
            })
        })).then((awnserData) => {
            let result = questionData
            result.awnsers = awnserData
            res.send({success: true, data: result})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err})
        })
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editQuestion = (req, res) => {
    if(!req.params.questionId){
        res.send({success: false, message: "Missing question id"})
        return;
    }

    db.question.update({
        questionInput: req.body.questionInput
    },{
        where : {
            id:req.params.questionId
       }
    }).then((questionData) => {
        Promise.all(req.body.awnsers.map(awnser => {
            return new Promise((resolve, reject) => {
                db.awnser.update({
                    awnserInput: awnser.awnserInput,
                    isCorrectAwnser: awnser.isCorrectAwnser
                },{
                    where : {
                        id:awnser.id
                    }
                }).then((awnserData) => {
                    resolve(awnserData)
                }).catch((err) => {
                    reject(err.message)
                })
            })
        })).then((awnserData) => {
            let result = questionData
            result.awnsers = awnserData
            res.send({success: true, data: result})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err})
        })
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.deleteQuestion = (req, res) => {
    if(!req.params.questionId) {
        res.send({success: false, message: "Missing Question ID as parameter"})
        return;
    }

    db.question.destroy({
        where: {
            id: req.params.questionId
        }
    }).then(() => {
        res.send({success: true})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}