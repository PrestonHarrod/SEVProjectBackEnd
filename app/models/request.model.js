//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("request", {

      requestID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
      },
      userID: {
        type: DataTypes.INTEGER
      },
      Type: {
          type: DataTypes.STRING
      },
      desc: {
          type:DataTypes.STRING
      },



    },
      {
        tableName: 'requests'

    });

    return Request;
  };