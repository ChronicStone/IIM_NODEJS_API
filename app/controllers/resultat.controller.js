const db = require("../models")

exports.createResultat = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing license ID as parameter"})
        return;
    }

    db.Resultat.create({
        license_id: req.body.license_id,
        Resultat_number: req.body.Resultat_number,
        title: req.body.title,
        summary: req.body.summary
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.editResultat = (req, res) => {

}

exports.getAllResultat = (req, res) => {

}

exports.getResultatById = (req, res) => {

}



exports.deleteResultat = (req, res) => {
    if(!req.params.ResultatId) {
        res.send({success: false, message: "Missing Resultat ID as parameter"})
        return;
    }

    db.page.destroy({
        where: {
            Resultat_id: req.params.ResultatId
        }
    }).then(() => {
        db.Resultat.destroy({
            where: {
                id: req.params.ResultatId
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