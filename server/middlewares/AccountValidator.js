import bcrypt from 'bcryptjs';
import Validator from '../_helpers/post_validators';
import pool from '../database/dbConfig';

class AccountValidator {
  static createAccountInputValidator(req, res, next) {
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

  static createAccountDuplicateValidator(req, res, next) {
    const { email, username } = req.body;
    pool.query(`SELECT email from users where email = '${email}'`)
      .then((foundEmail) => {
        pool.query(`SELECT username from users where username = '${username}'`)
          .then((foundUsername) => {
            if (foundEmail.rowCount === 0 && foundUsername.rowCount === 0) {
              return next();
            }
            res.status(409).json({
              status: 409,
              message: 'Credentials already in use',
              error: true });
          });
      }).catch(err => (
        res.status(500).json(err)
      ));
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
        if (user.rowCount > 0) {
          if (bcrypt.compareSync(password, user.rows[0].password) === false) {
            return res.status(401).json({
              status: 401,
              message: 'Wrong Password',
            });
          }
          req.user = user.rows[0];
          return next();
        }
        return res.status(404).json({ status: 404, message: 'User does not exist', error: true });
      }).catch(err => (
        res.status(500).json(err)
      ));
  }
}

export default AccountValidator;
