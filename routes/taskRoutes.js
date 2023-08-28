const express=require('express')

const AuthenticationMiddleware=require('../middleware/Authenticate')

const router=express.Router()

const taskControllers=require('../Controllers/taskControllers')

router.get('/getTasks',AuthenticationMiddleware.authenticate,taskControllers.getTaskDetails)

router.post('/postTasks', AuthenticationMiddleware.authenticate, taskControllers.postTaskDetails)

router.post('/marked/:id',taskControllers.markedAsComplete)

router.post('/delete/:id',taskControllers.deleteTasks)

router.post('/editTasks/:id',taskControllers.editTasks)

module.exports=router