import { Model } from "sequelize"

declare namespace Express {
    export interface Request {
        user: any //Model<any, any>
    }
}