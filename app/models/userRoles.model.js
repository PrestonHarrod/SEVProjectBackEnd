//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const userRole = sequelize.define("userRole", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
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