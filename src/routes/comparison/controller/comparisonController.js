const {Router} = require('express')

class ComparisonController{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){
    /**
     * @swagger
     * /comparison:
     *   get:
     *     summary: Obtener comparaciones (endpoint de prueba)
     *     tags:
     *       - Comparison
     *     responses:
     *       200:
     *         description: Respuesta de prueba del controlador de comparación
     */
        this.router.get('/',(req,res,next)=>{
            res.status(200).json({message:'comparison controller'})
        })

        return this.router

    }
}

module.exports = { ComparisonController }