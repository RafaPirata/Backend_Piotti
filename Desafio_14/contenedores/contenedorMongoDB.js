
const mongoose=require('mongoose')

const {ObjectId} = require('mongodb')

const { options } = require('../options/config')
const logger = require('../logger')

class ContenedorMongoDB {
    constructor(model) {
        this.model = model
        this.connect()
    }

    connect(){
        try{
            mongoose.connect(options.mongoRemote.MONGO_URL_CONNECT, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: 'test'
            })
        } catch (err){logger.error();(err)}
    }

    async getAll(){
        try{
            return await this.model.find();
        }
        catch (err){
            logger.error(err)
        }
    }

    async getById(id){
        try{
            return await this.model.find({_id: id})
        }catch(err){
            logger.error(err)
        }
    }

    async save(object){
        const newObject = new this.model(object);
        try{
            await newObject.save();
            return newObject._id;
        }catch (err){
            logger.error(err)
        }
    }

    async updateById(id, fields){
        try {
            await this.model.updateOne({_id: id},fields)
        }catch (err) {
            logger.error(err)
        }
    }

    async deleteById(id){
        try {
            await this.model.deleteOne({_id: id})
        }catch (err) {
            logger.error(err)
        }
    }

    async addProduct(cartId, product){
        try {
            const productAdd = {...product._doc, cantidad: product.cantidad}
            await this.model.updateOne({_id: cartId},{$push: {productos: productAdd}})
        }catch (err) {
            logger.error(err)
        }
    }

    async removeProduct(cartId, productId){
        try{
            await this.model.updateOne({_id: cartId},{$pull: {productos: {_id: ObjectId(productId)}}})
        }catch (err) {
            logger.error(err)
        }
    }
}
module.exports=ContenedorMongoDB