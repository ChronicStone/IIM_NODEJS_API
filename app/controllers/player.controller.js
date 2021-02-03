const db = require("../models")

exports.createPlayer = (req, res) => {
    if(!req.body.quizzId || !req.body.playerInput || !req.body.correctAwnserId) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.player.create({
        username: req.body.username,
        password: req.body.password,
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editPlayer = (req, res) => {
    if(!req.body.quizzId || !req.body.playerInput || !req.body.correctAwnserId) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    if(!req.params.id){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }

    if(db.player.find({where: {id : req.params.id}})){
        db.player.update({
            username: req.body.Player_number,
            password: req.body.title,
        },{
            where : {
                Player_id:req.params.id
           }
        }).then(() => {
            res.send({success: true})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err.message})
        })
    }
    else{
        res.send({success: false, message:"Player not found"})
    }
}

exports.getAllPlayer = (req, res) => {
    db.player.findAll()
    .then((data) => {
        res.send({success:true, data:data})
    }).catch((err) => {
        res.send({success:true, message:err.message})
    })
}

exports.getPlayerById = (req, res) => {
    if(!req.params.Id){
        res.send({success: false, message: "Missing username id"})
        return;
    }
    if(db.player.find({where: {id : req.params.id}})){
        db.player.findOne({
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
        res.send({success:false, message:"Player not found"})
    }
}

exports.deletePlayer = (req, res) => {
    if(!req.params.id) {
        res.send({success: false, message: "Missing Player ID as parameter"})
        return;
    }

    if(db.player.find({where: {id : req.params.id}})){
        db.player.destroy({
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
        res.send({success:false, message:"Player not found"})
    }
}