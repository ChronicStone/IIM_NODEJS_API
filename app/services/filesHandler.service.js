require("dotenv").config({ path: "../../.env" });
const db = require("../models")
const aws = require("aws-sdk");
const ejs = require("ejs")
const fs = require("fs")
const path = require("path")
const pdf = require("html-pdf")
const request = require("request")

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

const uploadFile = (file, callback) => {
    buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var data = {
      Key: `avatar/${Date.now()}.png`,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/png',
      Bucket: process.env.AWS_S3_BUCKET,
    };

    s3.putObject(data, function(err, result){
        if (err) {
          console.err({S3UploadErr: err});
          return callback(null, err)
        } else {
          console.info(`succesfully uploaded the page to S3 !`);
          return callback({success: true, fileKey: data.Key})
        }
    });
}

const deleteFile = (fileKey, callback) => {
    s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileKey
    }, (err, data) => {
        if(err) {
            console.error(err)
            return callback(null, err)
        }
        if(data) {
            return callback({success: true})
        }
    })
}

const compilePdfData = async (playerScoreId, callback) => {
    let playerScoreRes = await db.playerScore.findOne({where: { id: playerScoreId }})
    let player = await db.player.findOne({where: {id: playerScoreRes.playerId}})
    let quizz = await db.quizz.findOne({where: {id: playerScoreRes.quizzId}})
    let quizzAuthor = await db.player.findOne({where: {id: quizz.creatorPlayerId}})

    let pdfData = {
        quizzId: playerScoreRes.quizzId,
        playerScore: playerScoreRes.playerScore,
        quizzTotalScore: playerScoreRes.quizzTotalScore,
        playerName: player.username,
        quizzName: quizz.title,
        quizzAuthorName: quizzAuthor.username
    }

    return callback(pdfData)
}

const buildScorePdf = (playerScoreId, callback) => {
    const htmlContent = fs.readFileSync(__dirname + `/sample.html`, {encoding: 'utf8'})
    function getHeight(fileType) {
        if (fileType === 'score_report') return '29.7cm'
        else return '21cm'
    }
    function getWidth(fileType) {
        if (fileType === 'official_certificate') return '29.7cm'
        else return '21cm'
    }

    let options = {
        "height": "29.7cm",        // allowed units: mm, cm, in, px
        "width": "21cm",
        "border": "5mm",
        "footer": {
            "height": "10mm",
       },
    };


    const fileName = `${playerScoreData.quizzId}_${playerScoreData.playerName}_${Date.now()}.pdf`
    pdf.create(htmlContent, options).toFile(__dirname + `../../../public/certificates/${fileName}`, function (err, data) {
        if (data) console.log("### PDF FILE GENERATED ###");
        if (err) console.log(err)

        const fileData = {
            fileName: fileName,
            fileUrl: `${process.env.API_BASEURL}/${'certificates'}/${fileName}`,
            format: "pdf",
            playerScoreId: playerScoreId
        }
        return callback(fileData, err)
    })



    // compilePdfData(playerScoreId, (playerScoreData, err) => {
    //     if(err) return callback(null, err)
    //     if(playerScoreData) {
    //         console.log("### STARTING FILE RENDER ###")
    //         ejs.renderFile(path.join(__dirname, '../../views/', `certificate.ejs`), playerScoreData, (err, pdfContent) => {
    //             if (err) {
    //                 console.log("=> FILE RENDER ERROR <+")
    //                 console.error(err)
    //                 return callback(null, err)
    //             }
                
    //             const fileName = `${playerScoreData.quizzId}_${playerScoreData.playerName}_${Date.now()}.pdf`
    //             let options = {
    //                 "height": "21cm",        // allowed units: mm, cm, in, px
    //                 "width": "29.7cm",
    //                 "header": {
    //                     "height": "0mm"
    //                 },
    //                 "footer": {
    //                     "height": "0mm",
    //                 },
    //             };

    //             pdf.create(pdfContent, options).toFile(__dirname + `../../../public/certificates/${fileName}`, function (err, data) {
    //                 if (data) console.log("### PDF FILE GENERATED ###");
    //                 if (err) console.log(err)

    //                 const fileData = {
    //                     fileName: fileName,
    //                     fileUrl: `${process.env.API_BASEURL}/${'certificates'}/${fileName}`,
    //                     format: "pdf",
    //                     playerScoreId: playerScoreId
    //                 }
    //                 return callback(fileData, err)
    //             })
                
    //         })
    //     }
    // })
}

const uploadCertificateS3 = (file, callback) => {
    const options = {
        uri: file.fileUrl,
        encoding: null,
    };

    const filePath = `certificates/${file.fileName}`;
    request(options, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            console.log({ success: false, message: "failed to get file", url: options.uri });
            return callback(null, error)
        } else {
            s3.putObject({
                Body: body,
                Key: filePath,
                Bucket: process.env.AWS_S3_BUCKET,
            },
                function (error, data) {
                    if (error) return callback(null, err)
                    if(data) {
                        console.log("QUIZZ CERTIFICATE UPLOADED TO S3");
                        db.playerScore.update({
                            certificate: filePath 
                        }, {
                            where: { id: file.playerScoreId }
                        }).then(() => {
                            console.log("FILE STORED IN S3");
                            console.log("FileURL", process.env.AWS_S3_URL + filePath);
                            return callback({fileUrl: process.env.AWS_S3_URL + filePath});
                        }).catch((err) => {
                            console.error(err)
                            return callback(null, err)
                        })
                    }
                }
            );
        }
    });
}

module.exports = {
    uploadFile,
    deleteFile,
    buildScorePdf,
    uploadCertificateS3
}