import mongoose from 'mongoose';
const { Schema } = mongoose;

const ContactSchema = new Schema({
  
    firstName: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    email: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    message: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    }
    
});

ContactSchema.virtual('contact', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'email',
    justOnce: true,
});

export default mongoose.model('Contact', ContactSchema);