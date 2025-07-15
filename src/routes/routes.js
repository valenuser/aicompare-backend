const {Router} = require('express');
const { UserController } = require('./user/controller/userController');
const { CommentController } = require('./comment/controller/commentController');
const { ComparisonController } = require('./comparison/controller/comparisonController');
const { PromptController } = require('./prompt/controller/promptController');
const { VoteController } = require('./vote/controller/voteController');
const logger = require('../utils/logger')

class RouterManage{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){

        this.router.use('/user', new UserController().controllers())
        this.router.use('/comment', new CommentController().controllers())
        this.router.use('/comparison', new ComparisonController().controllers())
        this.router.use('/prompt', new PromptController().controllers())
        this.router.use('/vote', new VoteController().controllers())

        this.router.use((err, req, res, next) => {
            logger.error(err.message); // winston logea error
            res.status(err.statusCode).json({ error: err.message });
          });

    }
}
const routerManage = new RouterManage().router 

module.exports = routerManage; 