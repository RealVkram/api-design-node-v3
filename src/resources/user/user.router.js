import { Router } from 'express'
import { me, updateMe } from './user.controllers'

const router = Router()

// router.get('/', me)
// router.put('/', updateMe)

// using router in one space instead of above

router
  .route('/')
  .get(me)
  .put(updateMe)

export default router
