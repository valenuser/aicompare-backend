const {Router} = require('express');
const { UserController } = require('./user/controller/userController');


class RouterManage{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){

        this.router.use('/user', new UserController().controllers())

    }
}
const routerManage = new RouterManage().router 

module.exports = routerManage; 