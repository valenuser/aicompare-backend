const {Router} = require('express')
const AppError = require('../../../utils/AppError')

class UserController{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){
    /**
     * @swagger
     * /user:
     *   get:
     *     summary: Devuelve mensaje de prueba del controlador de usuario
     *     tags: [User]
     *     responses:
     *       200:
     *         description: Respuesta exitosa con mensaje
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: user controller
     */
        this.router.get('/',(req,res,next)=>{
            res.status(200).json({message:'user controller'})
        })


        return this.router

    }
}

module.exports = { UserController }