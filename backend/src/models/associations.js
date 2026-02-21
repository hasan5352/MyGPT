
import Thread from './Thread.js';
import Message from './Message.js';
import User from './User.js';

User.hasMany(Thread, { foreignKey: 'userId', as: 'threads' });
Thread.belongsTo(User, { foreignKey: 'userId', as: 'user'});

Thread.hasMany(Message, { foreignKey: 'threadId', as: 'messages' });
Message.belongsTo(Thread, { foreignKey: 'threadId', as: 'thread' });
