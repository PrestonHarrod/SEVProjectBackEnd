//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const TutorSlot = sequelize.define("tutorSlot", {

      tutorSlotID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,
        autoIncrement: true
        
      },
      tutorID: {
        type: DataTypes.INTEGER
      },
      studentID: {
        type: DataTypes.INTEGER
      },
      tutorSlotRequestID: {
        type: DataTypes.INTEGER
      },
      day: {
        type: DataTypes.STRING
      },
      startTime: { //format YYYY-MM-DD HH:MI:SS
          type: DataTypes.TIME
      },
      endTime:{
        type: DataTypes.TIME
      },
      status:{
        type: DataTypes.STRING
      },
      isScheduable:{
        type: DataTypes.BOOLEAN
      },
      numOfRegistered: {
        type: DataTypes.INTEGER
      }

    },
      {
        tableName: 'tutorSlots'

    });

    return TutorSlot;
  };