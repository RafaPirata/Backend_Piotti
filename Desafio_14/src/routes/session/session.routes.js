const { Router } = require('express')
const routerSession = Router()
const passport = require('passport');
const bCrypt = require('bcrypt');

const { countVisits } = require('../../middleware/countVisits/countVisits.middleware')

const serverMongoDB = require('../../../daos/usuariosDao/usuariosDaoMongoDB')
const constructor = serverMongoDB.ServerMongoDB
const server = new constructor()

// const passport = require('../../../utils/passport.js')
const users  = require('../../../helpers/UsersMem');
const Toast = require('../../../utils/Sweetalert');
const logger = require('../../../logger');

// routerSession.get('/', authMiddleware, sessionGet)
// routerSession.get('/logout', sessionLogout)
// routerSession.get('/login', sessionGet)
// // routerSession.post('/login', sessionPostLogin )
// routerSession.post('/login', passport.authenticate('login', {
//     successRedirect: '/api/session/login',
//     failureRedirect: '/api/session/logout'
// }))


//____________________________________________ login _____________________________________ //
function isValidPassword(user, password) {   
    const bCrypto =  bCrypt.compareSync(password, user.password)    
    return bCrypto
   }

routerSession.post('/login', countVisits ,async (req, res) => {

    try {
        const { username } = req.body
        let { password } = req.body
        
        const user = await server.getUserByUsername(username) 
        logger.info(',,,......,,.;::'+ user.username);

        const validado = isValidPassword(user, password)

        logger.info('pass output: '+ password + ' - validado -  '+ validado)

        if (validado) {
            const usuario = await server.getUserByUsernameAndPass(username, user.password)
            
            logger.info('usuario ---->>>>'+ usuario)
            if (!usuario) {
               return res.render('register.ejs')
                //return res.json({ error: 'Usuario no existe!!' });
            } else {
                //const access_token = generateToken(usuario) //user
                //res.json({ access_token })
                logger.info('usuario loggeado: '+ username )
                
                return res.render('index.ejs', { username } )
            }
        } else {
            logger.error('login--------- fallido !!!');
            return res.render('loginfallido.ejs', { username } )
            // return res.json({Mensaje : ERRORRR})
            //res.render('register', { flag: true, username, usuario })
        }

    } catch (error) {
        //logger.warn('aca');
        return res.render('userFallido.ejs')
        //res.status(500).send(error)
    }

})


routerSession.get('/login', (req, res) => { // lleva la vista del formulario de login
    
    res.render('login.ejs')
})

//____________________________________________ register _____________________________________ //

routerSession.get('/signup', (req, res) => {   // devuelve la vista de registro 
  
   res.render('register.ejs')

})

routerSession.post('/signup',  (req, res) => { // registra un usuario
    const {  username } = req.body
    let { password } = req.body

    function createHash(password) {
        return bCrypt.hashSync(
                  password,
                  bCrypt.genSaltSync(10),
                  null);
      }
      password = createHash(password)

      const yaExiste = server.getUserByUsername(username) 
  
      if (yaExiste === [] ) {
          return res.render('register', { username , flag: true }) // res.json({ error: 'ya existe ese usuario' });
      } else {
          const nuevoUsuario = {               
              username,
              password,                      
          }
          
          //------------------------------
          server.createUser(nuevoUsuario)
          //------------------------------
        //   const access_token = generateToken({
        //       username,
              // direccion 
        //   })
          res.render('login.ejs', { username: nuevoUsuario.username, flag: true })
          //res.json( { Success: 'Registro Exitoso con JWT: ', access_token })
      }
  })
  
//____________________________________________ logout _____________________________________ //

routerSession.get('/logout', (req, res) => { // cierra la sesion
    req.session.destroy(err =>{
        if(err) return res.send(err)
        //res.send('<h1>Sesion cerrada Adeu</h1>')
        res.render('login.ejs')
    })
})

//____________________________________________ github _____________________________________ //

routerSession.get('/github', passport.authenticate('github', {scope: ['user:email']}))

routerSession.get('/githubcallback', passport.authenticate('github', { 
    successRedirect: '/productos',
    failureRedirect: '/api/session/logout'
})),



module.exports = routerSession