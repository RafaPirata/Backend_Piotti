const fs = require("fs")
const logger = require("../logger")

module.exports = class ContainerArchivo {
  constructor(filePath) {
    this.filePath = filePath
  }

  async readFile() {
    try {
      const content = await fs.promises.readFile(this.filePath, "utf-8")
      //console.log("content: " + content)
      const contentParsed = JSON.parse(content)
      return contentParsed
    } catch (error) {
      logger.error("Error al leer archivo: " + error)
    }
  }
}
