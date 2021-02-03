module.exports = (app) => {
    const Resultat = require('../controllers/resultat.controller.js')
    
    app.post('/resultat/create', Resultat.createResultat)
    app.put('/resultat/update/:Id', Resultat.editResultat)
    app.get('/resultat', Resultat.getAllResultat)
    app.get('/resultat/:Id', Resultat.findResultatById)
    app.delete('/resultat/delete/:Id', Resultat.deleteResultat)
}