import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/v1/user';

dotenv.config();

const secretHash = process.env.SECRET_KEY;

const { createAccount } = User;

class AuthController {
  static createAccount(req, res) {
    const {
      firstname, lastname, othername, username, email, password, phonenumber,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const userDetails = {
      firstname, lastname, othername, username, email, password: hash, phonenumber,
    };
    createAccount(userDetails)
      .then((results) => {
        const returnedUserDetails = results.rows[0];
        const { id, role } = returnedUserDetails;
        const authDetail = { id, username, email, role };
        const jwToken = jwt.sign(authDetail, secretHash, { expiresIn: '2hr' });

        return res.status(201).json({
          status: 201,
          message: 'Account created',
          data: {
            id: results.rows[0].id,
            fullname: `${results.rows[0].firstname} ${results.rows[0].othername} ${results.rows[0].lastname}`,
            username: results.rows[0].username,
            email: results.rows[0].email,
            phonenumber: results.rows[0].phonenumber,
            registered: results.rows[0].registered,
            jwToken,
            authDetail,
          },
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static login(req, res) {
    const authDetail = {
      id: req.user.id, username: req.user.username, email: req.user.email, role: req.user.role,
    };

    const jwToken = jwt.sign(authDetail, secretHash, { expiresIn: '2hr' });

    return res.status(200).json({
      status: 200,
      message: 'Successfully logged in',
      jwToken,
      authDetail,
    });
  }

  static logout(req, res) {
    return res.status(200).json({
      status: 200,
      auth: false,
      token: null,
    });
  }
}

export default AuthController;
