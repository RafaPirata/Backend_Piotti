const { Router } = require('express')
const { sessionGet, sessionLogout, sessionPostLogin } = require('../../controllers/session/session.controllers')
const { authMiddleware } = require('../../middleware/auth.middleware')


const routerSession = Router()




routerSession.get('/', authMiddleware, sessionGet)
routerSession.get('/logout', sessionLogout)
routerSession.post('/login', sessionPostLogin )

module.exports = routerSession