//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {

      sessionID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
      },
      locationID: {
        type: DataTypes.INTEGER
      },
      tutorID: {
          type: DataTypes.INTEGER
      },
      studentID: {
        type: DataTypes.INTEGER
    },
      Type: {
          type: DataTypes.STRING
      },
      url: {
          type:DataTypes.STRING
      },
      rating: {
          type: DataTypes.INTEGER
      },
      scheduledStart: {
          type: DataTypes.DATE
      },
      scheduledEnd: {
        type: DataTypes.DATE
    },
      sessionEnd: {
        type: DataTypes.DATE
    },
      status: {
          type: DataTypes.STRING
      },
      tutorSlotID: {
          type: DataTypes.INTEGER
      },
      feedback: {
        type: DataTypes.STRING(1000)
      }


    },
      {
        tableName: 'sessions'

    });

    return Session;
  };
