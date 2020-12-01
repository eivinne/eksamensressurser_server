import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: ["3", "name cant be shorter than 3 characters"],
    max: ["20", "name cant be longer than 20 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: ["3", "name cant be shorter than 3 characters"],
    max: ["20", "name cant be longer than 20 characters"],
  },
});



UserSchema.virtual('polls', {
    ref: 'Poll',
    localField: '_id',
    foreignField: 'creator',
    justOnce: true,
});

export default mongoose.model('User', UserSchema);


