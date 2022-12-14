const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { users } = require('../helpers/UsersMem.js');
const logger = require('../logger.js');


// console.log(users)

function createHash(password) {
    return bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10),
                null
            );  
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}


passport.use('login', new LocalStrategy(
    
    (username, password, done) => {
        
        logger.info('passport login')
        logger.info('User', users)
        const user = users.find(u => u.username === username )
        logger.info(password)
        logger.info('user', user)
        
        if (!user) {
            logger.error('User Not Found with username ' + username);
          return done(null, false, { message: 'User Not found.' });
        }
        
        if (user.password !== password) {
            return done(null,false)
        }
   
   
        // if (!isValidPassword(user, password)) {
        //   console.log('Invalid Password');
        //   return done(null, false);
        // }
        
   
        return done(null, user)
    
    })
);

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
    },
    (req, username, password, done) => {
        let user = users.find(u => u.username === username)
        
        
        if (user) {
            logger.info('User already exists');
            return done(null, false, { message: 'User already exists' })
        }
        const { admin } = req.body
        
        const newUser = {
            id: users.length + 1,
            username,
            password,
            admin
        }
        users.push(newUser)


        return done(null, newUser)        
    })    
)


     
passport.serializeUser((user, done) => { // esto es para guardar el usuario en la sesion
    done(null, user.id);
});
    
passport.deserializeUser((id, done) => {
    let user = users.find(user => user.id === id)
    done(null, user)
})



module.exports = passport
