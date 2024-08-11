const { default: Redis } = require('ioredis')
const mongoose = require('mongoose')

const MongoConnection = ()=>{
    let uri = process.env.mongo
    mongoose.connect(uri).then(data=>{console.log('Mongo server is connected successfuly!')}).catch(err=>console.log('An error ocurred while connection with mongodb',err))
}
const RedisConnection = ()=>{
    const port = process.env.Redis_Port
    const host = process.env.Redis_Host
    const password = process.env.Redis_Password
    const redis = new Redis({
        host,
        port,
        password

    })
    redis.on('connect', () => {
        console.log('Connected to Redis')
    })
    redis.on('error', (err) => {
        console.error(`Error connecting to Redis: ${err}`)
    })
    return redis
}
const redis = RedisConnection()
module.exports = {MongoConnection,redis}
