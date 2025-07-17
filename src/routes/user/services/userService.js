const prisma = require('../../prisma/client')
const logger = require('../../../utils/logger')
const AppError = require('../../../utils/AppError');


class UserService {
    async findAllUsers(){
        try{

            let users = await prisma.user.findMany()
    
            return users

        }catch(err){

            logger.error('❌ Error en findAllUsers:', err);
            throw new AppError('Error al obtener usuarios', 500);

        }

    }

    async findOrCreateUser(googleUserData) {
        const { googleId, email, name, picture } = googleUserData;
    
        try {
          let user = await prisma.user.findUnique({ where: { googleId:googleId } });
          if (!user) {
            user = await prisma.user.create({
              data: { googleId, email, name, avatarUrl: picture },
            });
          }
          return user;
        } catch (error) {
        console.log(error)
          throw new AppError('Error al crear o buscar usuario', 500);
        }
      }


    async findUserByGoogleId(googleId) {
        try {
          const user = await prisma.user.findUnique({
            where: { googleId }
          });
      
          if (!user) {
            throw new AppError('Usuario no encontrado', 404);
          }
      
          return user;

        } catch (error) {
          throw new AppError('Error al buscar usuario', 500);
        }
    }




    // Actualizar datos de un usuario
    async updateUser(googleId, updateData) {
        try {
            const updatedUser = await prisma.user.update({
                where: { googleId:googleId },
                data: updateData,
            });

            return updatedUser;

        } catch (err) {
            console.log(err)
            // Puede fallar si el usuario no existe o hay error de DB
            throw new AppError('Error al actualizar usuario', 500);
        }
    }

    // Eliminar usuario por id
    async deleteUser(googleId) {
        try {
            await prisma.user.delete({
                where: { googleId:googleId },
            });
            return { message: 'Usuario eliminado correctamente' };
        } catch (err) {
        // Puede fallar si el usuario no existe o hay error de DB
            console.log(err)
            throw new AppError('Error al eliminar usuario', 500);
        }
    }

    // Obtener cantidad total de usuarios
    async countUsers() {
        try {

            const total = await prisma.user.count();
            return total;

        } catch (err) {
            
            throw new AppError('Error al contar usuarios', 500);

        }
    }
}

module.exports = UserService