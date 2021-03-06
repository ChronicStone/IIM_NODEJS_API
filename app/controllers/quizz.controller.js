const db = require("../models")

exports.createQuizz = (req, res) => {
    if(!req.body.title || !req.body.description) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.quizz.create({
        title: req.body.title,
        description: req.body.description,
        creatorPlayerId: req.player.id,
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editQuizz = (req, res) => {
    if(!req.params.quizzId){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }

    db.quizz.update(req.body , { where : { id:req.params.quizzId }})
    .then(() => {
        res.send({success: true})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.changeQuizzMode = (req, res) => {
    db.quizz.findOne({where :{id: req.params.quizzId}})
    .then((data) => {
        if(data && data.creatorPlayerId === req.player.id) {
            db.quizz.update({published: req.body.public}, {where: {id: req.params.quizzId}})
            .then(() => {
                res.send({success: true})
            })
            .catch((err) => {
                res.send({success: false, message: err.message})
                return
            })
        } else {
            res.send({success: false, message: "This quizz does not belongs to you, you cannot change its mode."})
        }
    })
}

exports.getAllQuizz = (req, res) => {
    db.quizz.findAll({
        where: {published: true},
        include: [{
            model: db.player,
            attributes: ['id', 'username', 'avatar'],
            where: {
                id: db.Sequelize.col('quizz.creatorPlayerId')
            }
        }]
    }).then((data) => {
        res.send({success:true, data:data})
    }).catch((err) => {
        console.error(err)
        res.send({success:true, message:err.message})
    })
}

exports.getQuizzById = (req, res) => {
    if(!req.params.quizzId){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }
    
    db.quizz.findOne({
        where: {
            id : req.params.quizzId
        },
        include: [{
            model: db.question,
            where: {
                quizzId: db.Sequelize.col('quizz.id'),
            },
            required: false,
            include: [
                {
                    model: db.awnser,
                    where: { 
                        questionId: db.Sequelize.col('questions.id')
                    },
                    required: false,
                }
            ],
        }, {
            model: db.playerScore,
            attributes: ['id', 'playerId', 'playerScore', 'quizzTotalScore'],
            include: [{
                model: db.player,
                attributes: ['id', 'username', 'avatar'],
                where: {
                    id: db.Sequelize.col('playerScores.playerId')
                },
                required: false
            }],
            where: {
                quizzId: db.Sequelize.col('quizz.id')
            },
            required: false
        }, {
            model: db.player,
            where:  {
                id: db.Sequelize.col('quizz.creatorPlayerId')
            }
        }]
    }).then((data)=>{
        res.send({ success:true, data:data })
    }).catch((err) =>{
        console.error(err)
        res.send({success:false, message:err.message})
    })
}

exports.getQuizzByCreatorId = (req, res) => {
    if(!req.params.playerId) {
        res.send({success: false, message: "Missing PlayerId!"})
        return
    }

    db.quizz.findAll({
        where: {
            creatorPlayerId: req.params.playerId
        }
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        res.send({success: false, message: err.message})
    })
}

exports.deleteQuizz = (req, res) => {
    if(!req.params.quizzId) {
        res.send({success: false, message: "Missing Quizz ID as parameter"})
        return;
    }

    db.quizz.destroy({ where: { id: req.params.quizzId }})
    .then(() => res.send({success: true}))
    .catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.disableQuizz = (req, res) => {
    if(!req.params.quizzId) {
        res.send({success: false, message: "Missing Quizz ID"})
    }

    db.quizz.update({ disabled: true }, { where: { id: req.params.quizzId }})
    .then(() => res.send({success: true}))
    .catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message || 'An error has occured while disabling this quizz, please try again'})
    })
} 
