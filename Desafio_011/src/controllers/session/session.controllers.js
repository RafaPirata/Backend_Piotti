const sessionGet = async (req, res) => {
    try {
        req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1
        console.log('user: ', req.session.user)
        res.render('index.ejs', { username: req.session.user, visitas: req.session.visitas })
     } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success: false
        })
    }
}

const sessionLogout = (req, res) => {
    console.log('req.session: ', req.session.user)
        req.session.destroy(err =>{
            if(err) return res.send(err)
             res.render('login.ejs')
            // res.send('<h1>Sesion cerrada. Adios</h1>')
        })
}




const sessionPostLogin = async (req, res) => {
    
    const { username, password } = req.body
    
    // if (username !== 'rafa' || password !== 'admin') {
    //   return res.send('<h1>Login Failed!</h1>')
    // }
    req.session.user = username
    req.session.password= password
    req.session.admin = true
    res.render('index.ejs', { username: req.session.user, visitas: req.session.visitas })
    //res.send('<h1>login success!</h1>')
   }

module.exports = { 
    sessionGet,
    sessionLogout,
    sessionPostLogin
}