//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {

      roleID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false
      },
      type:{
        type: DataTypes.STRING
      },
    },
      {
        tableName: 'roles'

    });

    return Role;
  };