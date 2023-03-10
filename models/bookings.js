'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookings.hasOne(models.users,{ foreignKey: 'id'});
      bookings.belongsToMany(models.dishes,{through:'booking_dishes'});

    }
  }
  bookings.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    booking_date: DataTypes.DATEONLY,
    time:DataTypes.STRING,
    id_user: DataTypes.INTEGER
   }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};