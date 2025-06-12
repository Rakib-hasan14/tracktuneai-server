import express from 'express'

// Controller
import { userController } from 'src/modules/users/users.controller'

const userRouter = express.Router()

userRouter.post('/register', userController.registerAnUser)
userRouter.post('/login', userController.loginAnUser)

export { userRouter }
