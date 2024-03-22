'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      qtd: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      categoriaID: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'categorias',
            key:'id',
            allowNull:false,
            onUpdate:('RESCTRICT'),
            onDelete:('RESTRICT')
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};