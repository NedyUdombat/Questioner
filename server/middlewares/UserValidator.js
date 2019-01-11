class UserValidator {
  static userValidator(req, res, next) {
    const { user } = req.body;
    if (user === '' || typeof user !== 'string') {
      return res.status(400).json({
        status: 400,
        message: 'User is cannot be empty and must be a string',
      });
    }
    return next();
  }
}

export default UserValidator;
