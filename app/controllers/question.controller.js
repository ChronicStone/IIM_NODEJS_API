const db = require("../models")

exports.createQuestion = (req, res) => {
    if(!req.body.quizzId || !req.body.questionInput || !req.body.correctAwnserId) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.question.create({
        quizzId: req.body.Question_number,
        questionInput: req.body.questionInput,
        correctAwnserId: req.body.correctAwnserId,
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editQuestion = (req, res) => {
    if(!req.body.quizzId || !req.body.questionInput || !req.body.correctAwnserId) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    if(!req.params.id){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }

    if(db.question.find({where: {id : req.params.id}})){
        db.question.update({
            title: req.body.Question_number,
            description: req.body.title,
            creatorPlayerId: req.body.createQuestion,
        },{
            where : {
                Question_id:req.params.id
           }
        }).then(() => {
            res.send({success: true})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err.message})
        })
    }
    else{
        res.send({success: false, message:"Question not found"})
    }
}

exports.deleteQuestion = (req, res) => {
    if(!req.params.id) {
        res.send({success: false, message: "Missing Question ID as parameter"})
        return;
    }

    if(db.question.find({where: {id : req.params.id}})){
        db.question.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.send({success: true})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err.message})
        })
    }
    else{
        res.send({success:false, message:"Question not found"})
    }
}