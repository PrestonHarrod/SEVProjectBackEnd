//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const LoginToken = sequelize.define("loginToken", {

      token: {
        type: DataTypes.STRING,
        primaryKey: true, 
        unique: true,
        allowNull: false
      },
        userID:{
        type: DataTypes.INTEGER
      },
      email:{
        type: DataTypes.STRING
      },
    },
      {
        tableName: 'loginTokens'

    });

    return LoginToken;
  };