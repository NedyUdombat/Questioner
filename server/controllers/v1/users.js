import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../../models/v1/users';
import pool from '../../models/v1/dbConfig';

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

  static loginAccount(req, res) {
    const { email, password } = req.body;
    pool.query(`SELECT * FROM users Where email = '${email}' `)
      .then((user) => {
        if (user.rowCount > 0) {
          const returnedUserDetails = user.rows[0];
          if (bcrypt.compareSync(returnedUserDetails.password, password) === false) {
            const { id, username, role } = returnedUserDetails;
            const authDetail = { id, username, email, role };

            const jwToken = jwt.sign(authDetail, secretHash, { expiresIn: '100hr' });

            return res.status(200).json({
              status: 200,
              message: 'Successfully logged in',
              jwToken,
              authDetail,
            });
          }
          return res.status(401).json({
            status: 401,
            failed: 'Wrong Password',
          });
        }
        return res.status(404).json({ status: 404, message: 'User does not exist', error: true });
      }).catch(/* istanbul ignore next */ err => (
        res.status(500).json(err)
      ));
  }
}

export default AuthController;
