import { DataTypes } from 'sequelize'
import { dbConnection } from '../connections/dbConnection.js'

export const metarDecoderLogs = dbConnection.define(
    'metarDecoderLogs',
    {
        icao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        error: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rawMetar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        decodedMetar: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        modelName: 'metarDecoderLogs',
        tableName: 'metar_decoder_logs'
    }
)
