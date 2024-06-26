import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('user', userSchema);

export default User;