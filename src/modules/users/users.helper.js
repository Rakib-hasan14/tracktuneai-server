import { UsersEntity } from './users.entity'

export const findUser = async (options, transaction) =>
  UsersEntity.findOne({ ...options, transaction })
