import mongoose from "mongoose";

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  
    tittel: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    ingress: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    innhold: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    dato: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    forfatter: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    kategori: {
        type: String,
        required: true,
        min: ["3", "Must be more than three characters"],
        max: ["20", "Can not be longer than 20 characters"],
    },
    
});

ArticleSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'creator',
    justOnce: true,
});

export default mongoose.model('Article', ArticleSchema);