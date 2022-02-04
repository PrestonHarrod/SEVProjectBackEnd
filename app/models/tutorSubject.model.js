//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const tutorSubject = sequelize.define("tutorSubject", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
        },
      tutorID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subjectID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
      {
        tableName: 'tutorSubject'

    });

    return tutorSubject;
  };