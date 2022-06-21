import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import bcrypt from 'bcryptjs';
import File from './File';

class User extends Model {
    checkPassword = async(password) => {
        return bcrypt.compare(password, this.password_hash);
    }
}

User.init({
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.VIRTUAL, // Virtual field - not stored in database
    password_hash: Sequelize.STRING,
    provider: Sequelize.BOOLEAN,
    file_id: {
        type: Sequelize.INTEGER,
        references: {
            model: File, // <----- name of the table
            key: 'id' // <----- primary key
        }
    }

}, { sequelize, tableName: 'users' });

User.addHook('beforeSave', async(user) => {
    let salt = bcrypt.genSaltSync(10);

    if (user.password) {
        user.password_hash = bcrypt.hashSync(user.password, salt)
    }

    return this;
});


User.belongsTo(File, { foreignKey: 'file_id', as: 'photo' }); // <----- name of the model and alias of the table

(async() => {
    await sequelize.sync();

})();

export default User;