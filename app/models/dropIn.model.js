//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const DropIn = sequelize.define("dropIn", {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
      },
      fname: {
        type: DataTypes.STRING
      },
      lname: {
        type: DataTypes.STRING
      },
      date:{
        type: DataTypes.DATEONLY
      },
      email:{
        type: DataTypes.STRING
      },
      studentIDNum:{
        type: DataTypes.STRING
      },
      subject:{
        type: DataTypes.STRING
      },
    },
      {
        tableName: 'dropIns'

    });

    return DropIn;
  };