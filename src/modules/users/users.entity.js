import bcrypt from 'bcryptjs'

import { DataTypes } from 'sequelize'

// Index
import { sequelize } from 'src/index'

const UsersEntity = sequelize.define(
  'users',
  {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [6, 20],
      },
    },
  },
  {
    createdAt: 'created_at',
    indexes: [
      {
        fields: ['id'],
        unique: true,
      },
      {
        fields: ['email'],
        unique: true,
      },
    ],
    timestamps: true,
    updatedAt: 'updated_at',
  }
)

// Hash password before saving
UsersEntity.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
})

export { UsersEntity }
