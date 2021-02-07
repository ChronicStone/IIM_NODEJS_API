const db = require("../models")
const fileHandler = require("../services/filesHandler.service")


exports.createPlayerScore = (req, res) => {
    if(!req.body.playerId || !req.body.quizzId || !req.body.playerScore || !req.body.quizzTotalScore) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.playerScore.create({
        playerId: req.body.playerId,
        quizzId: req.body.quizzId,
        playerScore: req.body.playerScore,
        quizzTotalScore: req.body.quizzTotalScore,
        // playerAwnsers: req.body.playerAwnsers,
    }).then((playerScoreData) => {
        fileHandler.buildScorePdf(playerScoreData.id, (data, err) => {
            if(err) {
                res.send({success: false, message: err})
            }
            if(data) {
                fileHandler.uploadCertificateS3(data, (pdfData, err) => {
                    if(err) res.send({success: false, message: err})
                    if(pdfData) res.send({success: true, playerScoreId: playerScoreData.id})
                })
            }
        })
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.getAllPlayerScore = (req, res) => {
    db.playerScore.findAll()
    .then((data) => {
        res.send({success:true, data:data})
    }).catch((err) => {
        res.send({success:true, message:err.message})
    })
}

exports.getPlayerScoresByPlayerId = (req, res) => {
    if(!req.params.playerId){
        res.send({success: false, message: "Missing player id"})
        return;
    }

    db.playerScore.findAll({
        where: {
            id : req.params.playerId
        },
    }).then((data)=>{
        res.send({sucess:true, data:data})
    }).catch((err) =>{
        console.log(err)
        res.send({success:false, message:err.message})
    })
}

exports.getPlayerScoresByScoreId = (req, res) => {
    if(!req.params.playerScoreId){
        res.send({success: false, message: "Missing score id"})
        return;
    }

    db.playerScore.findOne({
        where: {
            id : req.params.playerScoreId
        },
        include: [{
            model: db.quizz,
            where: {
                id: db.Sequelize.col('quizzId')
            },
            required: false
        }]
    }).then((data)=>{
        res.send({sucess:true, data:data})
    }).catch((err) =>{
        console.log(err)
        res.send({success:false, message:err.message})
    })
}