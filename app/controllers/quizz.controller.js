const db = require("../models")

exports.createQuizz = (req, res) => {
    if(!req.body.title || !req.body.description || !req.body.createQuizz) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    db.quizz.create({
        title: req.body.Quizz_number,
        description: req.body.title,
        creatorPlayerId: req.body.createQuizz,
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editQuizz = (req, res) => {
    if(!req.body.title || !req.body.description || !req.body.createQuizz) {
        res.send({success: false, message: "Missing fields"})
        return;
    }

    if(!req.params.id){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }

    if(db.quizz.find({where: {id : req.params.id}})){
        db.quizz.update({
            title: req.body.Quizz_number,
            description: req.body.title,
            creatorPlayerId: req.body.createQuizz,
        },{
            where : {
                Quizz_id:req.params.id
           }
        }).then(() => {
            res.send({success: true})
        }).catch((err) => {
            console.error(err)
            res.send({success: false, message: err.message})
        })
    }
    else{
        res.send({success: false, message:"Quizz not found"})
    }
}

exports.getAllQuizz = (req, res) => {
    db.quizz.findAll({
        include: [{
            model: question,
            where: {
                quizz_id: db.Sequelize.col('quizz.id'),
            },
            required: false,
            include: [{
                    model: awnser,
                    where: {
                        question_id: db.Sequelize.col("question.id"),
                    },
                    required: false,
                },
            ],
        }, ],
    }).then((data) => {
        res.send({success:true, data:data})
    }).catch((err) => {
        res.send({success:true, message:err.message})
    })
}

exports.getQuizzById = (req, res) => {
    if(!req.params.Id){
        res.send({success: false, message: "Missing quizz id"})
        return;
    }
    if(db.quizz.find({where: {id : req.params.id}})){
        db.quizz.findOne({
            where: {
                id : Id
            },
            include: [{
                model: question,
                where: {
                    quizz_id: db.Sequelize.col('quizz.id'),
                },
                required: false,
                include: [{
                        model: awnser,
                        where: {
                            question_id: db.Sequelize.col("question.id"),
                        },
                        required: false,
                    },
                ],
            }, ],
        }).then((data)=>{
            res.send({sucess:true, data:data})
        }).catch((err) =>{
            console.log(err)
            res.send({success:false, message:err.message})
        })
    }
    else{
        res.send({success:false, message:"Quizz not found"})
    }
}

exports.deleteQuizz = (req, res) => {
    if(!req.params.id) {
        res.send({success: false, message: "Missing Quizz ID as parameter"})
        return;
    }

    db.quizz.destroy({
        where: {
            Quizz_id: req.params.id
        }
    }).then(() => {
        db.quizz.destroy({
            where: {
                id: req.params.id
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

exports.disableQuizz = (req, res) => {
    if(!req.params.quizzId) {
        res.send({success: false, message: "Missing Quizz ID"})
    }

    db.quizz.update({
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
