const mongoose = require('mongoose')
const dbUrl = process.env.CONNECTION_URL || 'mongodb://localhost:27017/bordz'


const connectDB = async () => {
    mongoose.Promise = Promise

    mongoose.connection.on('connected', () => {
        console.log(`Connection Established with host ${mongoose.connection.host}`)
    })

    mongoose.connection.on('reconnected', () => {
        console.log('Connection Reestablished')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Connection Disconnected')
    })

    mongoose.connection.on('close', () => {
        console.log('Connection Closed')
    })

    mongoose.connection.on('error', (error) => {
        console.log('ERROR: ' + error)
    })

    const run = async () => {
        await mongoose.connect(dbUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }

    run().catch(error => console.error(error))
}

module.exports = connectDB

