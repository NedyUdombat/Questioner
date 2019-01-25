import bcrypt from 'bcryptjs';
import Validator from '../_helpers/post_validators';
import pool from '../models/v1/dbConfig';

class AccountValidator {
  static createAccountValidator(req, res, next) {
    const { firstname, lastname, username, email, password } = req.body;

    const fields = { firstname, lastname, username, email, password };
    const fields2 = {
      othername: req.body.othername,
      phonenumber: req.body.phonenumber,
    };
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    validator.validate(fields2, 'string');

    if (validator.hasErrors) {
      return res.status(400).json({
        errorMessages: validator.getErrors(),
      });
    }
    return next();
  }

  static loginAccountValidator(req, res, next) {
    const { email, password } = req.body;

    const fields = { email, password };
    const validator = new Validator();
    validator.validate(fields, 'required|string');

    if (validator.hasErrors) {
      return res.status(400).json({
        errorMessages: validator.getErrors(),
      });
    }
    pool.query(`SELECT * FROM users Where email = '${email}' `)
      .then((user) => {
        if (bcrypt.compareSync(password, user.rows[0].password) === false) {
          return res.status(401).json({
            status: 401,
            message: 'Wrong Password',
          });
        }
      }).catch(/* istanbul ignore next */ err => (
        res.status(500).json(err)
      ));
    return next();
  }
}

export default AccountValidator;
