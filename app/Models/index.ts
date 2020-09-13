import sequelize from '@database/index'

// Import Models
import UserModel from "@app/Models/User";


// Export Models
export const User = UserModel(sequelize)