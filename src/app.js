const express = require('express');
const dotenv = require("dotenv").config()
const cors = require("cors")
const router = require("./routes/routes")

class App {

    constructor() {
        this.app = express()
        this.middlewares()
        this.listen()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cors())
        this.app.use(router)
    }


    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    }

}

new App()