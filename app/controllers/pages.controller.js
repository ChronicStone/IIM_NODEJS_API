const db = require("../models")
const FileHandler = require("../services/filesHandler.service")

exports.createPage = (req, res) => {
    if(!req.params.licenseId || !req.params.chapterId || !req.body.file || !req.body.pageNumber) {
        res.send({success: false, message: "Missing input parameter / body attribute"})
        return
    }

    let fileData = {
        licenseId: req.parmas.licenseId,
        chapterId: req.params.chapterId,
        file: req.body.file,
        pageNumber: req.body.pageNumber,
    }

    FileHandler.uploadFile(fileData, (data, err) => {
        if(err) {
            console.error(err)
            res.send({sucess: false, message: "An error has occured while uploading the file to S3", err: err})
        }
        if(data) {
            db.page.create({
                chapter_id: req.params.chapterId,
                page_number: req.body.pageNumber,
                file_path: data.fileKey
            }).then((data) => {
                res.send({success: true, data: data})
            }).catch((err) => {
                console.error(err)
                res.send({success: false, message: err.message || "An error has occured while saving page to database"})
            })
        }
    })
}

exports.deletePage = (req, res) => {
    if(!req.params.pageId) {
        res.send({success: false, message: "Missing input page ID"})
        return
    }

    db.page.findOne({where: { id: req.params.pageId }})
    .then((data) => {
        if(data && data.file_path) {
            FileHandler.deleteFile(data.file_path, (data, err) => {
                if(err) {
                    console.error(err)
                    res.send({success: false, message: "An error has occured while deleting file from S3"})
                } else if(data && data.success) {
                    db.page.destroy({where: { id: req.params.pageId }})
                    .then(() => res.send({success: true}))
                    .catch((err) => res.send({success: false, message: err.message}), console.error(err))
                }
            })
        } else {
            res.send({success: false, message: "Page not found on database"})
            return;
        }
    })

    )
}