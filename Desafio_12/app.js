const express  = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
require('dotenv').config()
const { options } = require('./options/config.js')
const cors = require('cors')

const { infoRouter } = require('./rutas/info.routes')

const {initPassport} = require("./src/middleware/passportGithub")
const {initPassportMongodb} = require("./src/middleware/passportMongodb")


const cookiesRoutes = require('./src/routes/cookies/cookies.routes')
const productosRouter = require('./rutas/productos.js')


//--------------------------------------------------------------------------
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true }
//--------------------------------Local-------------------------

//const sessionRoutes = require('./src/routes/session/session.routes')
const passport = require('./utils/passport.js')   

//---------------------------Github---------------------------

const sessionRoutes = require('./src/routes/session/session.routes')
//const passportGithub = require('./src/middleware/passportGithub') 
//---------------------------MONGODB---------------------------
//const passport = require('./src/middleware/passportMongodb')




const app = express()

// app.use(session({
//     secret: 'secreto',
//     cookie: {
//         httpOnly: false,
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24
//     },
//     rolling: true,
//     resave: true,
//     saveUninitialized: false
// }))

app.use(session({
    store: MongoStore.create({
        mongoUrl: options.mongoRemote.MONGO_URL_CONNECT,
        mongoOptions: advancedOptions
    }),
    secret: 'camel2',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

initPassportMongodb()

app.use(passport.initialize());
app.use(passport.session());

//initPassport()



app.use(cookieParser(process.env.SECRET_KEY_COOKIE))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(logger('dev'))

app.use(express.static('public'))
app.use(express.static('src/images'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views/pages') 

app.use('/api/productos-test', productosRouter)
app.use('/', productosRouter)
app.use('/cookies',cookiesRoutes)
app.use('/api/session', sessionRoutes)
app.use('/data', infoRouter)

 

module.exports = app