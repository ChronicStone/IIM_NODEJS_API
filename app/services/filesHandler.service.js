require("dotenv").config({ path: "../../.env" });
const db = require("../models")
const aws = require("aws-sdk");

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

const uploadFile = (fileData, callback) => {
    buf = Buffer.from(fileData.file.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var data = {
      Key: `${fileData.licenseId}/${fileData.chapterId}/${fileData.pageNumber}_${Date.now()}.png`,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/png',
      Bucket: process.env.AWS_S3_BUCKET,
    };

    s3.putObject(data, function(err, data){
        if (err) {
          console.err({S3UploadErr: err});
          return callback(null, err)
        } else {
          console.info(`succesfully uploaded the page to S3 !`);
          return callback({success: true, fileKey: data.key})
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


module.exports = {
    uploadFile,
    deleteFile
}