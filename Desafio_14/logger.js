const winston = require('winston')
require('dotenv').config()

// trace 6
// debug 5
// info 4
// warn 3
// error 2
// fatal 1 

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
      
    ]
  })
  return prodLogger
}
function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ]
  })
  return devLogger
}
let logger = null
if (process.env.NODE_ENV === 'PROD') {
    console.log(process.env.NODE_ENV)
  logger = buildProdLogger()
} else {
    console.log(process.env.NODE_ENV)
  logger = buildDevLogger()
}
module.exports = logger