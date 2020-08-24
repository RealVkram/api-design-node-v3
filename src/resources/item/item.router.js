import { Router } from 'express'

const router = Router()

const controller = (res, req) => {
  res.send({ message: 'i am a request' })
}

// api/item
router
  .route('/')
  .get(controller)
  .post(controller)

// /api/item/:id
router
  .route('/:id')
  .put(controller)
  .delete(controller)
  .get(controller)

export default router
