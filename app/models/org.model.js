//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Org = sequelize.define("org", {

      orgID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        autoIncrement: true, 
        allowNull: false
      },
      name:{
        type: DataTypes.STRING
      },
    },
      {
        tableName: 'orgs'

    });

    return Org;
  };