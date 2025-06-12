import { UsersEntity } from 'src/modules/users/users.entity'

export const syncEntities = async () => {
  // await UsersEntity.sync({ alter: true })
  console.log('✅ Entities synced')
}

export { UsersEntity }
