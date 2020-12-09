import { contactService } from "../services/index.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import ErrorHandler from "../util/errorHandler.js";

export const get = catchAsyncErrors(async (req, res, next) => {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) {
      return next(
        new ErrorHandler(`Finner ikke Kontaktforespørsel:  ${req.params.id}`, 404)
      );
    }
    res.status(200).json(contact);
  });

  export const getAll = catchAsyncErrors(async (req, res, next) => {
    const allContacts = await contactService.getAllContacts();
    res.status(200).json(allContacts);
  });
  
  export const create = catchAsyncErrors(async (req, res, next) => {
    const contact = await contactService.createContact(req.body);
    console.log(req.body)
    res.status(201).json(contact);
  });
  
  export const remove = catchAsyncErrors(async (req, res, next) => {
    let contact = await contactService.getContactById(req.params.id);
    if(!contact){
      return next(new ErrorHandler(`Finner ikke artikkel ${req.params.id}`, 404));
    }
    contact = await contactService.removeContact(req.params.id);
    res.status(204).json({contact})
  });