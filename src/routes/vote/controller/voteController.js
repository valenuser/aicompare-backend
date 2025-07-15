const {Router} = require('express')

class VoteController{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){
    /**
     * @swagger
     * /vote:
     *   get:
     *     summary: Endpoint de prueba del controlador de votos
     *     tags:
     *       - Vote
     *     responses:
     *       200:
     *         description: Retorna mensaje de votos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: vote controller
     */

        this.router.get('/',(req,res,next)=>{
            res.status(200).json({message:'vote controller'})
        })

        return this.router

    }
}

module.exports = { VoteController }