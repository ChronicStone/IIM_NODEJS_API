const fileHandler = require("./filesHandler.service")

fileHandler.buildScorePdf(1, (data, err) => {
    if(err) console.error(err)
    if(data) {
        fileHandler.uploadCertificateS3(data, (result, err) => {
            if(err) console.error(err)
            if(result) console.log(result)
        })
    }
})