const db = require("../models")

exports.createUser = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing quizz ID as parameter"})
        return;
    }

    db.User.create({
        license_id: req.body.license_id,
        User_number: req.body.User_number,
        title: req.body.title,
        summary: req.body.summary
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editUser = (req, res) => {

}

exports.getAllUser = (req, res) => {

}

exports.getUserById = (req, res) => {

}

exports.deleteUser = (req, res) => {
    if(!req.params.UserId) {
        res.send({success: false, message: "Missing User ID as parameter"})
        return;
    }

    db.User.destroy({
        where: {
            User_id: req.params.UserId
        }
    }).then(() => {
        db.User.destroy({
            where: {
                id: req.params.UserId
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