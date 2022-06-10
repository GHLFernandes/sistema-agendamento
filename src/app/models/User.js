import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/config';
import bcrypt from 'bcryptjs';

class User extends Model {}
User.init({
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.VIRTUAL, // Virtual field - not stored in database
    password_hash: Sequelize.STRING,
    provider: Sequelize.BOOLEAN,

}, { sequelize, tableName: 'users' });

User.addHook('beforeSave', async(user) => {
    let salt = bcrypt.genSaltSync(10);

    if (user.password) {
        user.password_hash = bcrypt.hashSync(user.password, salt)
    }

    return user;
});

(async() => {
    await sequelize.sync();

})();


export default User;