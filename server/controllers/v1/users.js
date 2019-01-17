import moment from 'moment';
import bcrypt from 'bcryptjs';
import Users from '../../models/v1/users';
import pool from '../../models/v1/dbConfig';


const { createAccount } = Users;

class AuthController {
  static createAccount(req, res) {
    const {
      firstname, lastname, othername, username, email, password, phonenumber, role,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const userDetails = {
      firstname, lastname, othername, username, email, password: hash, phonenumber, role,
    };
    const roles = ['admin', 'user'].includes(role);
    if (!roles) return res.status(404).json({ message: 'This role does not exist' });
    pool.query(`SELECT email from users where email = '${email}'`)
      .then((found) => {
        if (found.rowCount === 0) {
          createAccount(userDetails)
            .then((results) => {
              if (results.rowCount > 0) {
                return res.status(201).json({
                  status: 201,
                  message: 'Account created',
                  data: results.rows,
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
          return res.status(409).json({ status: 409, message: 'email is already in use taken', error: true });
        }
      }).catch(err => (
        res.status(500).json(err)
      ));
  }

  static loginAccount(req, res) {
    const { email, password } = req.body;
    
  }
}

export default AuthController;
