'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.Message, { foreignKey: 'room_id' })
      Room.belongsTo(models.User, { foreignKey: 'user1_id' })
      Room.belongsTo(models.User, { foreignKey: 'user2_id' })
    }
  }
  Room.init({
    user1_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER,
    name_room: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};