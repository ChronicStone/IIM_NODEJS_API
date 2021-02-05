const db = require("../models")

exports.createPlayerScore = (req, res) => {
    if(!req.body.playerId || !req.body.quizzId || !req.body.playerScore || !req.body.quizzTotalScore || !req.body.playerAwnsers) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.playerScore.create({
        playerId: req.body.playerId,
        quizzId: req.body.quizzId,
        playerScore: req.body.playerScore,
        quizzTotalScore: req.body.quizzTotalScore,
        playerAwnsers: req.body.playerAwnsers,
    }).then((data) => {
        res.send({success: true, data: data})
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
    if(!req.params.playerScoreId || !req.params.playerId){
        res.send({success: false, message: "Missing player id or score id"})
        return;
    }

    db.playerScore.findOne({
        where: {
            id : req.params.playerScoreId
        },
    }).then((data)=>{
        res.send({sucess:true, data:data})
    }).catch((err) =>{
        console.log(err)
        res.send({success:false, message:err.message})
    })
}