const { Router } = require('express')
const infoRouter = Router()
const parseArgs = require('minimist')

const options = require('../options/config')

//const { fork } = require('child_process')
const path = require('path')
const logger = require('../logger')
// const compression = require('compression')

//---------------- Process object -----------------
const args = parseArgs(process.argv.slice(2))
const host = options.options.HOST
const direc = process.cwd()
const idProcess = process.pid
const nodeVersion = process.versions
const title = process.title
const os = process.platform
const memoryUse = process.memoryUsage()
const ruta = process.argv[1]
const port = process.argv[2] || 8000
const MODE = process.argv[3] || 'FORK'
const numCPUs = require('os').cpus().length

infoRouter.get('/info', (req, res) => {
    // console.log('args: ', args, host, direc, idProcess, nodeVersion, title, os, memoryUse)
    // console.log('ejemplo con log');
    res.json({
        Argumentos: args,
        Ruta: ruta,
        Host: host,
        Port: port,
        MODE: MODE,
        Numero_Procesadores: numCPUs,
        Carpeta: direc,
        Process_ID: idProcess,
        Node_Version: nodeVersion,
        Path_ejecion: title, 
        Operative_System: os,
        Memory_Use: memoryUse
    })
})

infoRouter.get('/api/randoms', (req, res) => {

    const maxCount = 1000000 // esta valor tarda 5 minutos aprox. en mi maquina
    const cant = parseInt(req.query.cant) || maxCount

    //console.log('Console de cant: ', cant)
    const forked = fork(path.resolve(__dirname, '../utils/computo.js'), [cant])
    
    if (cant <= maxCount) {
        forked.on('message', (msg) => {   
            logger.info('Returning api/randoms result: ', {Mensaje: msg})
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end( msg )
        })
        forked.send('start')
    
    } else {
        //  console.log(`What you are trying to do... kill your CPU by computing ${cant} randon numbers?`)
         res.json({ Mensaje: `What you are trying to do... kill your CPU by computing ${cant} randon numbers?`})
    }
})

infoRouter.get('/datos', (req, res)=>{
    logger.info(`puerto ${port}`)
    res.send(`Servidor express - PORT ${port} - PID : ${idProcess} - FyH: ${new Date().toLocaleString()}`)
})

module.exports = {
     infoRouter
} 