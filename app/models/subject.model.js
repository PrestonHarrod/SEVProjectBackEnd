//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subject", {

      subjectID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false
      },
      level: {
        type: DataTypes.INTEGER
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