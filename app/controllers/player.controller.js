const db = require("../models")

exports.createPlayer = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing license ID as parameter"})
        return;
    }

    db.Player.create({
        license_id: req.body.license_id,
        Player_number: req.body.Player_number,
        title: req.body.title,
        summary: req.body.summary
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editPlayer = (req, res) => {

}

exports.getAllPlayer = (req, res) => {

}

exports.getPlayerById = (req, res) => {

}

exports.deletePlayer = (req, res) => {
    if(!req.params.PlayerId) {
        res.send({success: false, message: "Missing Player ID as parameter"})
        return;
    }

    db.page.destroy({
        where: {
            Player_id: req.params.PlayerId
        }
    }).then(() => {
        db.Player.destroy({
            where: {
                id: req.params.PlayerId
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