import { DataTypes } from 'sequelize'
import { sequelize } from '../connections/dbConnection.js'

export const user = sequelize.define(
    'user',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)
