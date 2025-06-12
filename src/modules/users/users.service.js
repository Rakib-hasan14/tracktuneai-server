import bcrypt from 'bcryptjs'
import { size } from 'lodash'

// Config
import { config } from 'src/config/index.js'

// Entities
import { UsersEntity } from 'src/modules/users/users.entity.js'

// Helper
import { commonHelper, usersHelper } from 'src/modules/helpers'

export const createUser = async (body = {}, options, transaction) =>
  UsersEntity.create(body, { ...options, transaction })

export const registerUser = async (body = {}, transaction) => {
  commonHelper.checkRequiredFields(body, ['email', 'first_name', 'password'])

  const existingUser = await usersHelper.findUser({ where: { email: body.email } }, transaction)
  if (size(existingUser)) throw new Error('Email already registered.')

  const newUser = await createUser(
    { ...body, roles: [{ name: 'user' }] },
    { include: [{ association: 'roles' }] },
    transaction
  )

  return {
    id: newUser.id,
    email: newUser.email,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    token: commonHelper.generateToken(newUser),
  }
}

export const loginUser = async (body = {}, transaction) => {
  commonHelper.checkRequiredFields(body, ['email', 'password'])

  const user = await usersHelper.findUser({ where: { email: body.email } }, transaction)
  if (!user) throw new Error('User not found.')

  const isValid = await bcrypt.compare(body.password, user.password)
  if (!isValid) throw new Error('Invalid password.')

  return { id: user.id, email: user.email, token: commonHelper.generateToken(user) }
}
