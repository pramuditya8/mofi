'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShortUrl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShortUrl.init({
    MovieId: DataTypes.INTEGER,
    tinyUrl: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShortUrl',
  });
  return ShortUrl;
};