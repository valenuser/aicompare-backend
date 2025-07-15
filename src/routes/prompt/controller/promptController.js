const {Router} = require('express')

class PromptController{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){
    /**
     * @swagger
     * /prompt:
     *   get:
     *     summary: Obtener prompts (endpoint de prueba)
     *     tags:
     *       - Prompt
     *     responses:
     *       200:
     *         description: Respuesta de prueba del controlador de prompt
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: prompt controller
     */
        this.router.get('/',(req,res,next)=>{
            res.status(200).json({message:'prompt controller'})
        })

        return this.router

    }
}

module.exports = { PromptController }