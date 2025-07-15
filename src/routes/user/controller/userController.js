const {Router} = require('express')

class UserController{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){

        this.router.get('/',(req,res,next)=>{
            res.status(200).json({message:'user controller'})
        })

        return this.router

    }
}

module.exports = { UserController }