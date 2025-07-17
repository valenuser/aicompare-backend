const { Router } = require('express');
const AppError = require('../../../utils/AppError');
const UserService = require('../services/userService');

class UserController {
  constructor() {
    this.router = Router();
    this.UserService = new UserService();
    this.controllers();
  }

  controllers() {
    /**
     * @swagger
     * /user/all:
     *   get:
     *     summary: Obtiene todos los usuarios
     *     tags: [User]
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     */
    this.router.get('/all', async (req, res, next) => {
      try {
        const users = await this.UserService.findAllUsers();
        res.status(200).json(users);
      } catch (err) {
        next(err);
      }
    });    
    
   
    /**
     * @swagger
     * /user/count:
     *   get:
     *     summary: Devuelve la cantidad total de usuarios
     *     tags: [User]
     *     responses:
     *       200:
     *         description: Número total de usuarios
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 count:
     *                   type: integer
     */
    this.router.get('/count', async (req, res, next) => {
        try {
  
          const count = await this.UserService.countUsers();
          console.log(count)
          res.status(200).json({ count:count });
  
        } catch (err) {
          console.error('Error en /user/count:', err);
          next(err);
        }
      });
    
    /**
    * @swagger
    * /user/{googleId}:
    *   get:
    *     summary: Obtener un usuario por su Google ID
    *     tags: [User]
    *     parameters:
    *       - in: path
    *         name: googleId
    *         required: true
    *         schema:
    *           type: string
    *         description: ID único de Google del usuario
    *     responses:
    *       200:
    *         description: Usuario encontrado
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       404:
    *         description: Usuario no encontrado
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 status:
    *                   type: string
    *                   example: fail
    *                 message:
    *                   type: string
    *                   example: Usuario no encontrado
    */
   this.router.get('/:googleId', async (req, res, next) => {
     try {
       const { googleId } = req.params;
       const user = await this.UserService.findUserByGoogleId(googleId);
       res.status(200).json(user);
     } catch (err) {
       next(err);
     }
   });




    /**
     * @swagger
     * /user/google-login:
     *   post:
     *     summary: Busca o crea un usuario con datos de Google
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               sub:
     *                 type: string
     *                 description: Google user ID (googleId)
     *                 example: "1234567890abcdef"
     *               email:
     *                 type: string
     *                 format: email
     *                 example: "user@example.com"
     *               name:
     *                 type: string
     *                 example: "John Doe"
     *               picture:
     *                 type: string
     *                 format: uri
     *                 example: "https://example.com/avatar.jpg"
     *     responses:
     *       200:
     *         description: Usuario encontrado o creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: integer
     *                       example: 1
     *                     googleId:
     *                       type: string
     *                       example: "1234567890abcdef"
     *                     email:
     *                       type: string
     *                       example: "user@example.com"
     *                     name:
     *                       type: string
     *                       example: "John Doe"
     *                     avatarUrl:
     *                       type: string
     *                       example: "https://example.com/avatar.jpg"
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2025-07-17T15:00:00Z"
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 message:
     *                   type: string
     *                   example: Error al crear o buscar usuario
     */
    this.router.post('/google-login', async (req, res, next) => {
        try {
          const googleUserData = req.body;
          const user = await this.UserService.findOrCreateUser(googleUserData);
  
          res.status(200).json({
            status: 'success',
            data: user,
          });
        } catch (err) {
          next(err);
        }
      });


    /**
     * @swagger
     * /user/{googleId}:
     *   patch:
     *     summary: Actualiza datos de un usuario (parcial) por googleId
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: googleId
     *         required: true
     *         schema:
     *           type: string
     *         description: googleId del usuario a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               avatarUrl:
     *                 type: string
     *     responses:
     *       200:
     *         description: Usuario actualizado
     *       404:
     *         description: Usuario no encontrado
     */
    this.router.patch('/:googleId', async (req, res, next) => {
        try {
          const { googleId } = req.params;
          const updateData = req.body;
  
          if (!googleId) {
            throw new AppError('googleId inválido', 400);
          }
  
          const updatedUser = await this.UserService.updateUser(googleId, updateData);
  
          if (!updatedUser) {
            throw new AppError('Usuario no encontrado', 404);
          }
  
          res.status(200).json(updatedUser);
        } catch (err) {
          next(err);
        }
      });
  
      /**
       * @swagger
       * /user/{googleId}:
       *   delete:
       *     summary: Elimina un usuario por googleId
       *     tags: [User]
       *     parameters:
       *       - in: path
       *         name: googleId
       *         required: true
       *         schema:
       *           type: string
       *         description: googleId del usuario a eliminar
       *     responses:
       *       204:
       *         description: Usuario eliminado correctamente
       *       404:
       *         description: Usuario no encontrado
       */
      this.router.delete('/:googleId', async (req, res, next) => {
        try {
          const { googleId } = req.params;
  
          if (!googleId) {
            throw new AppError('googleId inválido', 400);
          }
  
          const deleted = await this.UserService.deleteUser(googleId);
  
          if (!deleted) {
            throw new AppError('Usuario no encontrado', 404);
          }
  
          res.status(204).send();
        } catch (err) {
          next(err);
        }
      });



    return this.router;
  }
}

module.exports = { UserController };
