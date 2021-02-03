module.exports = (app) => {
    require('./accounts.routes.js')(app)
    require('./licenses.routes.js')(app)
    require('./chapters.routes.js')(app)
}