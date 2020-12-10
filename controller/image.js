import path from 'path';
import { imageService } from '../services/index.js';
import catchAsyncErrors from '../middleware/catchAsync.js';
import ErrorHandler from '../util/errorHandler.js';
import { Console } from 'console';

export const create = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler('Last opp en bildefil', 400));
  }
  const image = await imageService.uploadImage(req.file);
  res.status(201).json({
    success: true,
    data: image,
  });
});

export const get = catchAsyncErrors(async (req, res, next) => {
  console.log("get",req.params.id)
  const image = await imageService.getImageById(req.params.id);
  console.log(image);
  if (!image) {
    return next(new ErrorHandler('Fant ikke bildefil', 404));
  }

  res.set({
    'Content-Type': image.file_mimetype,
  });

  console.log("abc",path.join(path.resolve(),"..",image.file_path));
  res.status(200)
    .sendFile(path.join(path.resolve(),"..",image.file_path));
});