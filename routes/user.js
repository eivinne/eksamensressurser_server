import express from 'express';
import {userController} from '../controller/index.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken';

const router = express.Router();
const secret = 'mysecretsshhh';
router.get('/:id', userController.get);
router.get('/', userController.list);



router.post('/create', function(req, res) {
    const { firstname, lastname, email, password, role } = req.body;
    const user = new User({ firstname, lastname, email, password, role});
    user.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again.");
          console.log(err);
      } else {
        res.status(200).send(req.body);
      }
    });
  });

router.post('/authenticate', function(req, res) {
  const { email, password, role } = req.body;
  User.findOne({ email }, function(err, user) {
    console.log(user);
    if (err) {
      console.error(err);
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
          const something = res.cookie('token', token)
            .sendStatus(200);
        }
      });
    }
  });
});

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.remove);

router.post('/login', userController.login);


export default router;