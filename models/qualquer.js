'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class qualquer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  qualquer.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'qualquer',
  });
  return qualquer;
};