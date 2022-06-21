import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class File extends Model {}

File.init({
    name: Sequelize.STRING,
    path: Sequelize.STRING,
    url: {
        type: Sequelize.VIRTUAL,
        get() {
            return `http://localhost:3332/files/${this.path}`;
        }
    }

}, { sequelize, tableName: 'files', modelName: 'File' });


(async() => {
    await sequelize.sync();
})();

export default File;