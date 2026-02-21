import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from './User.js';

const Thread = sequelize.define('Thread', {
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: "New Chat"
  },
  userId: {
    type: DataTypes.UUID,
    allowNull:false,
    references:{
      model: User,
      key: "id"
    }
  }
}, {
  timestamps:true
})

export default Thread;