import mongoose from "mongoose";

const { Schema } = mongoose;

const OfficeSchema = new Schema({
  
    name: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    address: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["55", "Can not be longer than 20 characters"],
    },
    phone: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    city: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    location: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
});

OfficeSchema.virtual('Offices', {
    ref: 'Offices',
    localField: '_id',
    foreignField: 'city',
    justOnce: true,
});

export default mongoose.model('Article', OfficeSchema);