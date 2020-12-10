import { userService } from "../services/index.js";
import User from "../models/user.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import ErrorHandler from "../util/errorHandler.js";
import jwt from 'jsonwebtoken';

const secret = 'mysecretsshhh';

export const get = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.getuserById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`Finner ikke user med ${req.params.id}`, 404)
    );
  }
  res.status(200).json(user);
});

export const list = catchAsyncErrors(async (req, res, next) => {
  const result = await userService.listusers();
  res.status(200).json({ result });
});


/*export const create = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.createuser(req.body);
  res.status(201).json(user);
});*/

export const create = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, password, role } = req.body;
  const user = await userService.createuser(req.body);
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send(req.body);
    }
    });
  });

export const authenticate = catchAsyncErrors(async (req, res, next)=> {
  console.log(req.body);
  const { email, password, role } = req.body;
  User.findOne({ email }, function(err, user) {
    console.log(user);
    if (err) {
      console.log(err);
      res.status(500)
        .json({
        error: 'En feil har Oppstått, vennligst prøv på nytt.'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          console.log(err);
          res.status(500)
            .json({
              error: 'En feil har oppstått, vennligst prøv på nytt.'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          
          // Issue token
          console.log(user.email)
          console.log(user.role)
          const payload = { email: user.email, role: user.role };
          const token = jwt.sign(payload, secret);
           res.cookie('token', token)
           .cookie('role',user.role).cookie('email',user.email).cookie('name',user.firstname)
            .sendStatus(200);
        }
      });
    }
  });

});

export const update = catchAsyncErrors(async (req, res, next) => {
  let user = await userService.getuserById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`Finner ikke user ${req.params.id}`, 404));
  }
  user = await userService.updateuser(req.params.id, req.body);
  res.status(200).json(user);
});

export const remove = catchAsyncErrors(async (req, res, next) => {
  let user = await userService.getuserById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`Finner ikke user ${req.params.id}`, 404));
  }
  user = await userService.removeuser(req.params.id);
  res.status(204).json({})
});

export const login = catchAsyncErrors(async (req, res, next) =>{
  const user = await userService.login(req.body); //skjekker om bruker eksi
  if(!user){ // hvis vi ikke får tilake bruker
      return next( // bruker next for at errorHandler skal ta seg av den
          // lager ny error med melding og kode
          new ErrorHandler(`Feil brukernavn eller passord`, 404)
      );
  }
  res.status(200).json(user);
});

export const logout = catchAsyncErrors(async (req, res, next) =>{
  console.log("Not working");

 return req.session.destroy();
});