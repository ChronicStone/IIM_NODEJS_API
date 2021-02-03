const db = require("../models")

exports.createLicense = (req, res) => {
    if(!req.body.name || !req.body.summary || !req.body.author || !req.body.status) {
        res.send({success: false, message: "Missing input fields", body: req.body})
        return;
    }

    db.license.create({
        name: req.body.name,
        summary: req.body.summary,
        author: req.body.author,
        status: req.body.status
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message || 'An error has occured while creating new license, please try again.'})
    })
}

exports.editLicense = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing license ID"})
        return;
    }

    db.license.update(req.body, {where: {id: req.params.licenseId}})
    .then((data) => res.send({success: true, data: data}))
    .catch((err) => {
        console.error(err)
        res.send({sucess: false, message: err.message || 'An error has occured while updating license, please try again.'})
    })
}

exports.getAllLicenses = (req, res) => {
    db.license.findAll().then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message || 'An error has occured while retriving licenses,'})
    })
}

exports.findLicenseById = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing license ID"})
        return;
    }

    db.license.findOne({
        where: {id: req.params.licenseId},
        includes: [{
            model: db.comment,
            where: {
                license_id: db.Sequelize.col('licenses.id')
            },
            required: false
        }, {
            model: db.chapter,
            where: {
                license_id: db.Sequelize.col('licenses.id')
            },
            required: false
        }]
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message || `An error has occured while retriving License n°${req.params.licenseId}`})
    })
}


// We dont actually want to erase licenses from database, so instead of this we'll simply add a 'deleted' attribute to
// the licenses model so that we can disable licenses, making them unavailable on the app without having to erasing it completely from db
exports.disableLicense = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing license ID"})
    }

    db.license.update({
        disabled: true
    }, {
        where: {
            id: req.params.licenseId
        }
    }).then(() => {
        res.send({success: true})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message || 'An error has occured while deleting this license, please try again'})
    })
}