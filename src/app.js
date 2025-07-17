const express = require('express');
const dotenv = require("dotenv").config()
const cors = require("cors")
const router = require("./routes/routes")
const morganLogger = require('./middlewares/morganLogger');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./utils/swagger');
const raterLimiter = require('./middlewares/raterLimiter')

class App {

    constructor() {
        this.app = express()
        this.middlewares()
        this.listen()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(morganLogger());
        setupSwagger(this.app)
        this.app.use(raterLimiter)
        this.app.use(cors())
        this.app.use(router)
        this.app.use(errorHandler)
    }


    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    }

}

new App() 