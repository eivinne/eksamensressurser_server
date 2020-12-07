// middleware.js
import jwt from 'jsonwebtoken'

const secret = 'mysecretsshhh';

export const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
    console.log("something1");
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
        console.log("something2");
      } else {
        req.email = decoded.email;
        console.log("something3");
        next();
      }
    });
  }
}

export default withAuth;