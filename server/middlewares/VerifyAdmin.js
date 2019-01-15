class VerifyAdmin {
  static isAdmin(req, res, next) {
    const { isAdmin } = req.body;

    if (isAdmin === false) {
      return res.status(403).json({
        message: 'You are not an Admin',
        error: true,
      });
    }
    return next();
  }
}

export default VerifyAdmin;
