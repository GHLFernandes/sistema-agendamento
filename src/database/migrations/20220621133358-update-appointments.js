'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'appointments', // tabela em que a coluna sera adicionada
            'user_id', { // nome da coluna
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                    onUpdate: 'CASCADE', // caso o id do usuario seja alterado, o id do agendamento tambem sera
                    onDelete: 'SET NULL',
                    allowNull: true,
                },
            }
        )
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('appointments', 'user_id'); // remove a coluna
    }
};