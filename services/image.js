/*
Image upload/download was the last thing we where working on and is not fully completed. The code snippets for image upload/download are gotten from the dropbox "Leksjon 13".
*/

import Image from '../models/image.js';

export const uploadImage = async (data) => {
  const image = new Image({
    file_path: data.path,
    file_mimetype: data.mimetype,
  });
  const savedImage = await image.save();
  return savedImage;
};

export const getImageById = async (id) => Image.findById(id);
