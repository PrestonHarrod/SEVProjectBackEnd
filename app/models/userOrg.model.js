//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const UserOrg = sequelize.define("userOrg", {
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
      orgID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
      {
        tableName: 'userOrg'

    });

    return UserOrg;
  };