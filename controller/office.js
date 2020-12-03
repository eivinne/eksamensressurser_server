//import { officeService } from "../services/index.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import result from "../data/Offices.json"
//import ErrorHandler from "../util/errorHandler.js";

/*export const get = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id);
  const event = await pollService.getPollByName(req.params.id);
  if (!event) {
    return next(
      new ErrorHandler(`Finner ikke event med ${req.params.id}`, 404)
    );
  }
  res.status(200).json(event);
});*/

export const list = catchAsyncErrors(async (req, res, next) => {
 // const result = await officeService.listPolls();

  res.status(200).json( result );
});
export const city = catchAsyncErrors(async (req, res, next) => {
  // const result = await officeService.listPolls();
  console.log(req.params.city);
   res.status(200).json( result.filter((item)=>{return item.city.toLowerCase() === req.params.city.toLowerCase() }));
 });


