const {Router} = require('express')

class CommentController{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){
    /**
     * @swagger
     * /comment:
     *   get:
     *     summary: Obtener comentarios (endpoint de prueba)
     *     tags:
     *       - Comment
     *     responses:
     *       200:
     *         description: Comentario de prueba desde el controlador
     */
        this.router.get('/',(req,res,next)=>{
            res.status(200).json({message:'comment controller'})
        })

        return this.router

    }
}

module.exports = { CommentController }