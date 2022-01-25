//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const TutorSlot = sequelize.define("tutorSlot", {

      tutorSlotID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false
      },
      tutorID: {
        type: DataTypes.INTEGER
      },
      startDateTime: {
          type: DataTypes.DATE
      },
      endDateTime:{
        type: DataTypes.DATE
      },
      status:{
        type: DataTypes.STRING
      },
      isScheduable:{
        type: DataTypes.BOOLEAN
      }

    },
      {
        tableName: 'tutorSlots'

    });

    return TutorSlot;
  };