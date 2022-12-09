const checkAuthentication = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/session/logout')
    } else {
        next()
    }
}

module.exports = { checkAuthentication }
