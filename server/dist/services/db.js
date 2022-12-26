import { config } from '../config.js';
import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
try {
    await sequelize.authenticate();
    console.log('DB connected.');
}
catch (error) {
    console.error('Error connecting DB:', error);
}
