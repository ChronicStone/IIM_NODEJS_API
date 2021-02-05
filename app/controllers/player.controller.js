const db = require("../models")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

exports.createPlayer = (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.player.findOne({
        where: {username: req.body.username}
    }).then((data) => {
        if(data) {
            res.send({success: false, message: "Username not available."})
            return
        } else {
            db.player.create({
                username: req.body.username,
                password: req.body.password,
            }).then(() => {
                res.send({ success: true })
            }).catch((err) => {
                console.error(err)
                res.send({success: false, message: err.message})
            })
        }
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.playerAuth = (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.send({success: false, message: "Missing player ID"})
        return
    }

    db.player.findOne({
        where: { 
            username: req.body.username,
            password: req.body.password
        },
        attributes: ['id', 'username']
    }).then((playerData) => {
        if(!playerData) res.send({success: false, message: "Player not found"})
        else {
            const token = jwt.sign({
                id: playerData.id,
                username: playerData.username
            }, process.env.BACKEND_SECRET_KEY, {
                expiresIn: '12h'
            })
    
            res.send({success: true, player: playerData, accessToken: token})
        } 
    })
}

exports.getAllPlayers = (req, res) => {
    db.player.findAll({
        attributes: ['id', 'username']
    })
    .then((data) => {
        res.send({success:true, data:data})
    }).catch((err) => {
        res.send({success:true, message:err.message})
    })
}

exports.getPlayerById = (req, res) => {
    if(!req.params.playerId){
        res.send({success: false, message: "Missing player id"})
        return;
    }

    db.player.findOne({ 
        attributes: ['id', 'username'],
        where: { id : req.params.playerId },
        include: [{
            model: db.playerScore,
            where: {
                playerId: db.Sequelize.col('player.id')
            },
            required: false
        }, {
            model: db.quizz,
            where: {
               creatorPlayerId: db.Sequelize.col('player.id') 
            },
            required: false
        }]
    })
    .then((data)=>{
        if(data) res.send({sucess:true, data:data})
        else res.send({success:false, message:"Player not found"})
    }).catch((err) =>{
        console.log(err)
        res.send({success:false, message:err.message})
    })
}

exports.deletePlayer = (req, res) => {
    if(!req.params.id) {
        res.send({success: false, message: "Missing Player ID as parameter"})
        return;
    }

    db.player.destroy({
        where: {
            id: req.params.id
        }
    }).then((res) => {
        if(res) res.send({success: true})
        else res.send({sucess: false})
        
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}