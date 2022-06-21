import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import User from '../../app/models/User';

class Appointment extends Model {}

Appointment.init({
    date: Sequelize.DATE,
    canceled_at: Sequelize.DATE,
}, { sequelize, tableName: 'appointments', modelName: 'Appointment' });

Appointment.belongsTo(User, { foreignKey: 'user_id', as: 'user' }); // <----- name of the model and alias of the table
Appointment.belongsTo(User, { foreignKey: 'collaborator_id', as: 'collaborator' }); // <----- name of the model and alias of the table


(async() => {
    await sequelize.sync();
})();

export default Appointment;