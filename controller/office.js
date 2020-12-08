
import { officeService } from "../services/index.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import ErrorHandler from "../util/errorHandler.js";


export const list = catchAsyncErrors(async (req, res, next) => {
  const result = await officeService.list();

  res.status(200).json( result );
});
export const city = catchAsyncErrors(async (req, res, next) => {
  const result = await officeService.city();
  console.log(req.params.city);
   res.status(200).json( result.filter((item)=>{return item.city.toLowerCase() === req.params.city.toLowerCase() }));
 });
 


