//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const TutorSlotRequest = sequelize.define("tutorSlotRequest", {

      tutorSlotRequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
      },
      tutorSlotID: {
        type: DataTypes.INTEGER
      },
      studentID: {
        type: DataTypes.INTEGER
      },
      subjectID: {
        type: DataTypes.INTEGER
      },
      desc: {
          type:DataTypes.STRING
      },
      isAccepted: {
        type: DataTypes.BOOLEAN
    },
    isGroupSession: {
        type: DataTypes.BOOLEAN
    },



    },
      {
        tableName: 'tutorSlotRequests'

    });

    return TutorSlotRequest;
  };