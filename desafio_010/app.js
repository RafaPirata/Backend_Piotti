const express  = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()
const cookiesRoutes = require('./src/routes/cookies/cookies.routes')
const sessionRoutes = require('./src/routes/session/session.routes')
const productosRouter = require('./rutas/productos.js')

const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true }

const app = express()

app.use(session({
    secret: process.env.SECRET_KEY_SESSION,
    
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL_CONNECT,
        mongoOptions: advancedOptions
    }),

    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 50000
    }
}))

app.use(cookieParser(process.env.SECRET_KEY_COOKIE))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))
app.use(express.static('src/images'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views/pages') 

app.use('/api/productos-test', productosRouter)
app.use('/', productosRouter)
app.use('/cookies',cookiesRoutes)
app.use('/api/session', sessionRoutes)

module.exports = app