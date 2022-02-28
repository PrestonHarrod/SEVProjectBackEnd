//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subject", {

      subjectID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
      },
      level: {
        type: DataTypes.INTEGER
      },
      subjectGenre: {
        type: DataTypes.STRING
      },
      name:{
        type: DataTypes.STRING
      },
      teacher:{
        type: DataTypes.STRING
      },
    },
      {
        tableName: 'subjects'

    });

    return Subject;
  };