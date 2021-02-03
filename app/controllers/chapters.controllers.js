const db = require("../models")

exports.createChaptere = (req, res) => {
    if(!req.params.licenseId) {
        res.send({success: false, message: "Missing license ID as parameter"})
        return;
    }

    db.chapter.create({
        license_id: req.body.license_id,
        chapter_number: req.body.chapter_number,
        title: req.body.title,
        summary: req.body.summary
    }).then((data) => {
        res.send({success: true, data: data})
    }).catch((err) => {
        console.error(err)
        res.send({success: false, message: err.message})
    })
}

exports.updateChaptere = (req, res) => {

}

exports.getChapterById = (req, res) => {

}

exports.deleteChapter = (req, res) => {
    if(!req.params.chapterId) {
        res.send({success: false, message: "Missing chapter ID as parameter"})
        return;
    }

    db.page.destroy({
        where: {
            chapter_id: req.params.chapterId
        }
    }).then(() => {
        db.chapter.destroy({
            where: {
                id: req.params.chapterId
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