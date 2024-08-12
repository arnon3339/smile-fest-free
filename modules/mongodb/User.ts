// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dailyscore: {
    type: Number,
    required: true,
  },
  dayscores: {
    type: Array<number>,
    required: true
  },
  totalscore: {
    type: Number,
    required: true,
  },
}, {collection: 'users'});

export default mongoose.models.User || mongoose.model('User', UserSchema);