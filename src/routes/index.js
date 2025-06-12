import { Router } from 'express'
import { userRouter } from 'src/modules/routes'

const router = Router()

router.use('/users', userRouter)

export default router
