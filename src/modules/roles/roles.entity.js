import bcrypt from 'bcryptjs'

import { DataTypes } from 'sequelize'

// Index
import { sequelize } from 'src/index'

export const RolesEntity = sequelize.define(
  'roles',
  {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      allowNull: false,
      type: DataTypes.ENUM('admin', 'user'),
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        key: 'id',
        model: 'users', // Assuming the users table is named 'users'
      },
      onDelete: 'CASCADE',
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
        fields: ['name'],
      },
    ],
    timestamps: true,
    updatedAt: 'updated_at',
  }
)
