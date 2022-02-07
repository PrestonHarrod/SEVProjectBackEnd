//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {

      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
      },
      fName:{
        type: DataTypes.STRING
      },
      lName:{
        type: DataTypes.STRING
      },
      email:{
        type: DataTypes.STRING
      },
      level:{
        type: DataTypes.STRING
      },
    },
      {
        tableName: 'users'

    });

    return User;
  };