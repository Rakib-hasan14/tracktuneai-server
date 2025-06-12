import { registerUser, loginUser } from 'src/modules/users/users.service'
import { sequelize } from 'src/index.js'

const userController = {}

userController.registerAnUser = async (req, res) => {
  const transaction = await sequelize.transaction()

  try {
    console.log('Registering user with data:', req.body)
    // Validate request body
    const result = await registerUser(req.body, transaction)
    transaction.commit()
    res.status(201).json(result)
  } catch (err) {
    transaction.rollback()
    res.status(400).json({ error: err.message })
  }
}

userController.loginAnUser = async (req, res) => {
  const transaction = await sequelize.transaction()

  try {
    const result = await loginUser(req.body, transaction)

    transaction.commit()
    res.status(200).json(result)
  } catch (err) {
    transaction.rollback()
    res.status(400).json({ error: err.message })
  }
}

export { userController }
