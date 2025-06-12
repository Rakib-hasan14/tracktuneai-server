import { UsersEntity } from 'src/modules/users/users.entity'
import { RolesEntity } from './roles/roles.entity'

// Users
UsersEntity.hasMany(RolesEntity, { foreignKey: 'user_id', onDelete: 'CASCADE' })
RolesEntity.belongsTo(UsersEntity, { foreignKey: 'user_id' })

export const syncEntities = async () => {
  // await RolesEntity.sync({ alter: true })
  // await UsersEntity.sync({ alter: true })
  console.log('✅ Entities synced')
}

export { RolesEntity, UsersEntity }
