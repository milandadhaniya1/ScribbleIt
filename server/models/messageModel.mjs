import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: String,
  username: String,
  message: String,
  messageTime: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('message', messageSchema);

export default Message;
