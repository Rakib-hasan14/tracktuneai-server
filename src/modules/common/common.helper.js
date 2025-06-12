import { filter, get, has, isNil } from 'lodash'
import jwt from 'jsonwebtoken'

// Config
import { config } from 'src/config'

export const checkRequiredFields = (data, requiredFields) => {
  const missingFields = filter(
    requiredFields,
    (field) => !has(data, field) || isNil(get(data, field))
  )
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
  }
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      user_id: user.id, // ✅ Include user ID
      email: user.email,
    },
    config.jwtSecret,
    {
      expiresIn: '1d', // or any duration you prefer
    }
  )
}
