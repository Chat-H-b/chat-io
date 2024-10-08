'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Room, { foreignKey: 'user1_id' })
      User.hasMany(models.Room, { foreignKey: 'user2_id' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        isEmail: {
          msg: 'Invalid Email Format'
        },
        notEmpty: {
          msg: 'Email must not empty'
        },
        notNull: {
          msg: 'Email must not empty'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username must be unique'
      },
      validate: {
        notEmpty: {
          msg: 'Username must not empty'
        },
        notNull: {
          msg: 'Username must not empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password must not empty'
        },
        notNull: {
          msg: 'Password must not empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};