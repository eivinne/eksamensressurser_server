import mongoose from 'mongoose';
const { Schema } = mongoose;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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