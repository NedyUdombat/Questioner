import Validator from '../_helpers/post_validators';

class AccountValidator {
  static createAccountValidator(req, res, next) {
    const { firstname, lastname, username, email, password, role } = req.body;

    const fields = { firstname, lastname, username, email, password, role };
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

    return next();
  }
}

export default AccountValidator;
