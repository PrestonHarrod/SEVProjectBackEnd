//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {

      locationID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,
        autoIncrement: true
      },
      building: {
        type: DataTypes.STRING
      },
      roomNum: {
          type: DataTypes.STRING
      },
      desc:{
        type: DataTypes.STRING
      },

    },
      {
        tableName: 'locations'

    });

    return Location;
  };