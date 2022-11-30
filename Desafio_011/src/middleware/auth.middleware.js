const authMiddleware = (req, res, next) => {

    //  linea 5 por    if (req.session?.user || req.session?.admin) {

    if (!req.session?.user || !req.session?.admin) {
        return res.status(401).send('<h1>No estas autorizado</h1>')
    } 
    next()
}

module.exports = { 
    authMiddleware
}