//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("userRole", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
        },
      userID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roleID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
      {
        tableName: 'userRole'

    });

    return UserRole;
  };