const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const AppError = require('../utils/AppError')
const logger = require('../utils/logger')




class AuthHandler{

    constructor(){

        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        this.jwtKey = process.env.JWT_SECRET_KEY
        this.supabaseJwtKey = process.env.SUPABASE_JWT_SECRET_KEY
        this.googleKey=process.env.GOOGLE_CLIENT_ID

    }

    authorizationJWT(req,res,next,token){
        try {
            const payload = jwt.verify(token, this.supabaseJwtKey);
            req.user = {
                googleId:payload.sub,
                email:payload.email,
                name:payload.user_metadata.name,
                picture:payload.user_metadata.picture
            }
                
            console.log(payload);
            
            return next()

          } catch {

            return res.status(401).json({ message: 'Token inválido' });

          }
    }


    async authorizationGoogle(req,res,next){
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){

            return res.status(401).json({message:'No token provided'})

        }

        const token = authHeader.split(' ')[1];

        
        try{

            const googleAuth = await this.googleClient.verifyIdToken({
                idToken:token,
                audience:this.googleKey
            })

            req.user = googleAuth.getPayload()

            return next()


        }catch(err){

            logger.error(err)

            return this.authorizationJWT(req,res,next,token)

        }
    }
}

module.exports = new AuthHandler()