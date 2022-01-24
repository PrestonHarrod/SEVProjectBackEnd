//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {

      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false
      },
      organizationID: {
        type: DataTypes.INTEGER
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
    },
      {
        tableName: 'users'

    });

    return User;
  };