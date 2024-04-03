import { DataTypes } from 'sequelize'
import { sequelize } from '../connections/dbConnection.js'

export const metarDecoderLogs = sequelize.define(
    'metarDecoderLogs',
    {
        icao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        errorLog: {
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
