require('dotenv').config()

import express from 'express'
import cors from 'cors'
import prodDatabase from './src/database/production'
import faultsDatabase from './src/database/faults'
import * as scheduler from './src/scheduler'

const app = express()
const port = process.env.PORT

initialize()

app.listen(port, () => {
    console.log(`MIKE API is running on port: ${port}`)
});

function initialize() {
    scheduler.initialize()

    setUpDatabase()
    setUpRoutes()
}

function setUpDatabase() {
    prodDatabase.database.sync()
    faultsDatabase.database.sync()
}

function setUpRoutes() {
    const { router } = require('./src/routes')
    app.use(cors())
    app.use(express.json())
    app.use('/api', router)
}
