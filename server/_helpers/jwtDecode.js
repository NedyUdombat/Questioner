import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretHash = process.env.SECRET_KEY;

class JwtDecode {
  static jwtDecode(req, res) {
    const jwToken = req.headers['x-access-token'];
    if (!jwToken) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(jwToken, secretHash, (err, decoded) => {
      res.status(200).json(decoded);
    });
  }
}
export default JwtDecode;
