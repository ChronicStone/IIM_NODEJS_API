const db = require("../models")

exports.createPlayerScore = (req, res) => {
    if(!req.body.playerId || !req.body.quizzId || !req.body.playerScore || !req.body.quizzTotalScore || !req.bodyplayerAwnsers) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.playerScore.create({
        playerId: req.body.playerId,
        quizzId: req.body.quizzId,
        playerScore: req.body.playerScore,
        quizzTotalScore: req.body.quizzTotalScore,
        bodyplayerAwnsers: req.body.bodyplayerAwnsers,
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editPlayerScore = (req, res) => {
    if(!req.body.playerId || !req.body.quizzId || !req.body.playerScore || !req.body.quizzTotalScore || !req.bodyplayerAwnsers) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    if(!req.params.id){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }

    if(db.playerScore.find({where: {id : req.params.id}})){
        db.playerScore.update({
            playerId: req.body.playerId,
            quizzId: req.body.quizzId,
            playerScore: req.body.playerScore,
            quizzTotalScore: req.body.quizzTotalScore,
            bodyplayerAwnsers: req.body.bodyplayerAwnsers,
        },{
            where : {
                PlayerScore_id:req.params.id
           }
        }).then(() => {
            res.send({success: true})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err.message})
        })
    }
    else{
        res.send({success: false, message:"PlayerScore not found"})
    }
}

exports.getAllPlayerScore = (req, res) => {
    db.playerScore.findAll()
    .then((data) => {
        res.send({success:true, data:data})
    }).catch((err) => {
        res.send({success:true, message:err.message})
    })
}

exports.getPlayerScoreById = (req, res) => {
    if(!req.params.Id){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }
    if(db.playerScore.find({where: {id : req.params.id}})){
        db.playerScore.findOne({
            where: {
                id : Id
            },
        }).then((data)=>{
            res.send({sucess:true, data:data})
        }).catch((err) =>{
            console.log(err)
            res.send({success:false, message:err.message})
        })
    }
    else{
        res.send({success:false, message:"PlayerScore not found"})
    }
}

exports.deletePlayerScore = (req, res) => {
    if(!req.params.id) {
        res.send({success: false, message: "Missing PlayerScore ID as parameter"})
        return;
    }

    if(db.playerScore.find({where: {id : req.params.id}})){
        db.Question.destroy({
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

exports.disablePlayerScore = (req, res) => {
    if(!req.params.quizzId) {
        res.send({success: false, message: "Missing PlayerScore ID"})
    }

    db.license.update({
        disabled: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send({success: true})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message || 'An error has occured while disabling this quizz, please try again'})
    })
} 