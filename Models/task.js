const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const task = sequelize.define("tasks", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  markedascomplete: {
    type: Sequelize.BOOLEAN,
    defaultValue:false
  },
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false
  }

},{timestamps:false});

module.exports=task