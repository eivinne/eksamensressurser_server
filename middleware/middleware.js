// middleware.js
import jwt from 'jsonwebtoken'

const secret = 'mysecretsshhh';

/*export const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
   
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
        
      } else {
        req.email = decoded.email;
        
        next();
      }
    });
  }
}*/

const withAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
      jwt.verify(token, secret, (err, user) => {
          if (err) {
            console.log(err);
              return res.sendStatus(403);
              
          }

          req.user = user;
          next();
      });
  } else {
      console.log(err);
      res.sendStatus(401);
  }
};





export default withAuth;