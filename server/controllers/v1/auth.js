import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../../models/v1/users';
import pool from '../../database/dbConfig';

dotenv.config();

const secretHash = process.env.SECRET_KEY;

const { createAccount } = Users;

class AuthController {
  static createAccount(req, res) {
    const {
      firstname, lastname, othername, username, email, password, phonenumber,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const userDetails = {
      firstname, lastname, othername, username, email, password: hash, phonenumber,
    };
    pool.query(`SELECT email from users where email = '${email}'`)
      .then((found) => {
        if (found.rowCount === 0) {
          createAccount(userDetails)
            .then((results) => {
              if (results.rowCount > 0) {
                const returnedUserDetails = results.rows[0];
                const { id, role } = returnedUserDetails;
                const authDetail = { id, username, email, role };
                const jwToken = jwt.sign(authDetail, secretHash, { expiresIn: '100hr' });

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
                  },
                });
              }
              return res.status(500).json({
                status: 500,
                error: 'Could not create account',
              });
            })
            .catch(error => res.status(400).json({
              status: 400,
              error: error.message,
            }));
        } else {
          return res.status(409).json({
            tatus: 409,
            message: 'email is already in use, if that email belongs to you, kindly login',
            error: true });
        }
      }).catch(err => (
        res.status(500).json(err)
      ));
  }

  static login(req, res) {
    const { email } = req.body;
    pool.query(`SELECT * FROM users Where email = '${email}' `)
      .then((user) => {
        if (user.rowCount > 0) {
          const authDetail = {
            id: user.rows[0].id, username: user.rows[0].username, email, role: user.rows[0].role,
          };

          const jwToken = jwt.sign(authDetail, secretHash, { expiresIn: '100hr' });

          return res.status(200).json({
            status: 200,
            message: 'Successfully logged in',
            jwToken,
            username: authDetail.username,
            email,
          });
        }
        return res.status(404).json({ status: 404, message: 'User does not exist', error: true });
      }).catch(/* istanbul ignore next */ err => (
        res.status(500).json(err)
      ));
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
