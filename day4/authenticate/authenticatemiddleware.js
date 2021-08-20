const { __esModule } = require("async")

function authenticate(req, res, next) {

    if(req.session) {
        if(req.session.userName) {
            next()
        } else {
            res.redirect('/login')
        }
    } else {
    res.redirect('/login')
    }
}

module.exports = authenticate