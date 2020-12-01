import { pollService } from "../services/index.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import ErrorHandler from "../util/errorHandler.js";

export const get = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id);
  const event = await pollService.getPollByName(req.params.id);
  if (!event) {
    return next(
      new ErrorHandler(`Finner ikke event med ${req.params.id}`, 404)
    );
  }
  res.status(200).json(event);
});

export const list = catchAsyncErrors(async (req, res, next) => {
  const result = await pollService.listPolls();
  res.status(200).json( result );
});

export const create = catchAsyncErrors(async (req, res, next) => {
  const event = await pollService.createPoll(req.body);
  res.status(201).json(event);
});

export const update = catchAsyncErrors(async (req, res, next) => {
  let poll = await pollService.getPollById(req.params.id);
  if (!poll) {
    return next(new ErrorHandler(`Finner ikke poll ${req.params.id}`, 404));
  }
  poll = await pollService.updatePoll(req.params.id, req.body);
  res.status(200).json(poll);
});

export const remove = catchAsyncErrors(async (req, res, next) => {
  let event = await pollService.getPollById(req.params.id);
  if(!event){
    return next(new ErrorHandler(`Finner ikke event ${req.params.id}`, 404));
  }
  event = await pollService.removePoll(req.params.id);
  res.status(204).json({})
});
