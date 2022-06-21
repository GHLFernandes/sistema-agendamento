'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'users', // tabela em que a coluna sera adicionada
            'file_id', { // nome da coluna
                type: Sequelize.INTEGER, // tipo da coluna
                references: {
                    model: 'files', // tabela de referencia
                    key: 'id' // chave da tabela de referencia
                },
                onUpdate: 'CASCADE', // caso o id do arquivo seja alterado, o file_id do usuario tambem sera
                onDelete: 'SET NULL', // caso o arquivo seja deletado, o file_id do usuario sera null
                allowNull: true
            }
        )
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('users', 'file_id'); // remove a coluna
    }
};