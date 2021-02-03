module.exports = (app) => {
    const Licenses = require('../controllers/licenses.controller.js')
    
    app.post('/licenses/create', Licenses.createLicense)
    app.put('/licenses/update/:licenseId', Licenses.editLicense)
    app.get('/licenses', Licenses.getAllLicenses)
    app.get('/licenses/:licenseId', Licenses.findLicenseById)
    app.delete('/licenses/disable/:licenseId', Licenses.disableLicense)
}