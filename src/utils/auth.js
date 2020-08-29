import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send('email and password required')
  }
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(200).send({ data: token })
  } catch (e) {
    return res /* allways use return statment */
      .status(400)
      .end() /* .send -- sends back a data and .end sends no data back */
  }
}

export const signin = async (req, res) => {}

export const protect = async (req, res, next) => {
  let token = req.headers.authorization.split('Bearer ')[1]

  if (!token) {
    return res.status(401).end()
  }

  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
      .select('-password')
      .lean() /* converts it to json */
      .exec()
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
  next()
}
