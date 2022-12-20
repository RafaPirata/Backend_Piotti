
const app = require('./Desafio_14/server') //express()

const logger = require('./Desafio_14/logger');
//const PORT = process.argv[2] || 8000

const cluster = require('cluster')


const numCPUs = require('os').cpus().length

logger.info(`Cantidad de nucleos: '${numCPUs}`);

// if (cluster.isPrimary) {
//     console.log(`Mater ${process.pid}`);
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork()        
//     }
//     cluster.on('exit', (worker, coder, signal )=>{
//         console.log(`Worker ${process.pid} died`);
//     })    
// } else {
    // try {
    //     app.listen(PORT)
    //         console.log(`SERVER listen on port ${PORT}`)
    //         console.log(`Worker ${process.pid} started`);
        
    // } catch (error) {
    //     console.log(error);
    // }
    
// }

// const PORT = process.env.PORT || 3000


const initSocket = require('./Desafio_14/utils/initSocket')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');
const yargs = require('yargs');

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
//------------------------------------------------------------------------
initSocket(io)
//--------------------------------------------------

const args = yargs.default({
    //p: 8080,
    //m: 'FORK'
}).argv
const PORT = process.argv[2] || 8000
const MODE = process.argv[3] || 'FORK'

// ---------------------------------------------------------------------------------
//FUNCION PARA EJECUTAR SERVIDOR

function runServer(){
    try{
        httpServer.listen(PORT)
        logger.info(`SERVER listen on port ${PORT}`)
        // console.log(`SERVER listen on port ${PORT}`)
        // console.log(`Worker ${process.pid} started`)
        logger.info(`Worker en FORK ${process.pid} started`)
    } catch (err){
        logger.error(err)
    }
}


// ---------------------------------------------------------------------------------
//SELECCION DE MODO (FORK O CLUSTER)

if(MODE === 'CLUSTER'){
    if(cluster.isPrimary){
        logger.info(`Master ${process.pid}`)
        for(let i=0; i < numCPUs; i++){
            cluster.fork()
        }
        cluster.on('exit', (worker, coder, sinal)=>{
            logger.info(`Worker en CLUSTER${worker.process.pid} died`)
        })
    }else{
        runServer()
    }
}else{
    runServer()
}





module.exports = app


//pm2 start app.js --name="Serverx" --watch -- PORT
//pm2 start app.js --name="Server1" --watch -- 8081
//pm2 start app.js --name="Server2" --watch -- 8082
//pm2 start app.js --name="Server3" --watch -i max -- 8083

// artillery quick -c 50 -n 50 "http://localhost:8000?max=100000" > result_fork.txt  para simular 50 consultas