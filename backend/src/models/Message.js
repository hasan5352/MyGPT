import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import Thread from "./Thread.js";

const Message = sequelize.define('Message', {
  role: {
    type: DataTypes.ENUM('user', 'robot'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  threadId: {
    type: DataTypes.UUID,
    allowNull:false,
    references:{
      model: Thread,
      key: "id"
    }
  }

}, {
  timestamps: true
})

export default Message;
