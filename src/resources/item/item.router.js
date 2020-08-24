import { Router } from 'express'

const router = Router()

const controller = (res, req) => {
  // console.log('i am working')
  res.send(req.body)
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
