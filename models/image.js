/*
Image upload/download was the last thing we where working on and is not fully completed. The code snippets for image upload/download are gotten from the dropbox "Leksjon 13".
*/

import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Image', ImageSchema);