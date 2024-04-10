import { DataTypes } from 'sequelize'
import { sequelize } from '../connections/dbConnection.js'

export const metarDecoderLogs = sequelize.define(
    'metarDecoderLogs',
    {
        icao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        error_log: {
            type: DataTypes.STRING,
            allowNull: true
        },
        raw_metar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        decoded_metar: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        modelName: 'metarDecoderLogs',
        tableName: 'metar_decoder_logs'
    }
)
