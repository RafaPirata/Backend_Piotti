const { Router } = require('express')
const ApiProductosMock = require('../api/productos.js')
const { options } = require('../options/config')

const apiProductos = new ApiProductosMock()
const router = Router()

const ContainerProducts = require('../daos/productos/ProductosDaoMongoDB')
const { authMiddleware } = require('../src/middleware/auth.middleware.js')
const containerProduct = new ContainerProducts(options.mongoRemote.MONGO_URL_CONNECT) 

router.post('/popular', async (req, res, next) => {
    const { cant } = req.params
    try {
        res.json(await apiProductos.popular(cant))
    } catch (error) {
        next(error)
    }
})

router.get('/productos', async (req, res, next) => {
    try {
        res.render('historial.ejs', await apiProductos.getAllProducts())
        
    } catch (err) {
        next(err)
    }
 })
 router.get('/home', async (req, res, next) => {
    try {
        res.render('home.ejs', await apiProductos.getAllProducts())
        
    } catch (err) {
        next(err)
    }
 })

router.get('/', async (req, res, next) => {
    try {
        res.render('home.ejs', await apiProductos.getAllProducts())
    } catch (err) {
        next(err)
    }
 })

 
 
 router.get('/:id', async (req, res, next) => {
    try {
        res.json(await apiProductos.getById(req.params.id))
    } catch (err) {
        next(err)
    }
 })
 

 router.post('/', async (req, res, next) => {
    try {
        await containerProduct.createProduct(req.body)
        res.redirect('/productos')
    } catch (err) {
        next(err)
    }
 })
 
//  router.put('/:id', async (req, res, next) => {
//     try {
//         res.json(await apiProductos.actualizar({ ...req.body, id: req.params.id }))
//     } catch (err) {
//         next(err)
//     }
//  })

 router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await apiProductos.deleteProduct(req.params.id))
    } catch (err) {
        next(err)
    }
 })
 

 router.use((err, req, res, next) => {
    const erroresNoEncontrado = [
        'Error al listar: elemento no encontrado',
        'Error al actualizar: elemento no encontrado',
        'Error al borrar: elemento no encontrado'
    ]
 
    if (erroresNoEncontrado.includes(err.message)) {
        res.status(404)
    } else {
        res.status(500)
    }
    res.json({ message: err.message })
 })
  
 module.exports = router