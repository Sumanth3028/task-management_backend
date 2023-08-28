const express=require('express')

const AuthenticationMiddleware=require('../middleware/Authenticate')

const router=express.Router()

const userControllers=require('../Controllers/userControllers')

router.post('/Signup',userControllers.postUserDetails)

router.post('/login',userControllers.postLoginDetails)

router.get('/username',AuthenticationMiddleware.authenticate,userControllers.usernameAccess)


module.exports=router