import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretHash = process.env.SECRET_KEY;

class VerifyToken {
  static verifyToken(req, res, next) {
    const jwToken = req.headers['x-access-token'];
    // const jwToken = req.headers.Authorization;

    if (!jwToken) {
      return res.status(401).json({
        auth: false,
        message: 'Please provide a JWT token',
      });
    }
    jwt.verify(jwToken, secretHash, (err, authData) => {
      if (err) {
        return res.status(401).json({
          auth: false,
          message: 'Please provide JWT token',
        });
      }
      req.authData = authData;
      return next();
    });
  }
}

export default VerifyToken;
