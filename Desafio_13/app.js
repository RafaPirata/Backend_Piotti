
const app = require('./server') //express()

//const PORT = process.argv[2] || 8000

const cluster = require('cluster')


const numCPUs = require('os').cpus().length

console.log(numCPUs);

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


const initSocket = require('./utils/initSocket')

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
        app.listen(PORT)
        console.log(`SERVER listen on port ${PORT}`)
        console.log(`Worker ${process.pid} started`)
    } catch (err){
        console.log(err)
    }
}


// ---------------------------------------------------------------------------------
//SELECCION DE MODO (FORK O CLUSTER)

if(MODE === 'CLUSTER'){
    if(cluster.isPrimary){
        console.log(`Master ${process.pid}`)
        for(let i=0; i < numCPUs; i++){
            cluster.fork()
        }
        cluster.on('exit', (worker, coder, sinal)=>{
            console.log(`Worker ${worker.process.pid} died`)
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