const ContainerMongoDB = require('../../contenedores/contenedorMongoDB')
const mongoose = require('mongoose');
const Usuarios = require('../../models/usuario')
const { options } = require('../../options/config.js');
const logger = require('../../logger');


class ServerMongoDB extends ContainerMongoDB{
    constructor() {
        //super(options.mongoDB.connection.URL)
        super(options.mongoRemote.MONGO_URL_CONNECT)
    }
    
    // connect() {
    //     try {
    //         const URL = process.env.MONGO_URL_CONNECT_ECOM
    //         mongoose.connect(URL, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true
    //         })
    //         console.log('Connected to MongoDB Server')
            
    //     } catch (error) {
    //         console.error('Error connection to DB: '+error)
    //     }
    // }

    async createUser(usuario){
        try {
            const newUser = new Usuarios(usuario)
            await newUser.save()
            logger.info('User created: ' + newUser)
        } catch (error) {
            logger.error(error)
        }
    }

    async getUser(){
        try {
            const users = await Usuarios.find()
            logger.info(users)
        } catch (error) {
            logger.error(error)
        }
    }

    async getUserByUsername(username){
        try {
            const user = await Usuarios.findOne( {username: `${username}`} )
            logger.info('usuario: '+ user)
            return user
        } catch (error) {
            logger.error(error)
        }
    }

    async getUserByUsernameAndPass(username, password) { 
        logger.info('username--pass-- '+ username)
        try {
            const user = await Usuarios.findOne( {username: `${username}`, password: `${password}` } )
            // console.log('user-::>> ', user)
            if ( user === [] || user === undefined || user === null) {
                return false    
            } else {
                return true
            }
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = { ServerMongoDB }