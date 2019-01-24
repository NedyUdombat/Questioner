class ParamsValidator {
  static idValidator(req, res, next) {
    const { meetupId, questionId, userId } = req.params;
    const validId = /^[0-9]+$/;
    // validate if id is valid
    const validateParam = (param) => {
      if (!param.match(validId)) {
        return res.status(400).json({
          status: 400,
          message: 'ID can only be a number',
          error: true,
        });
      }
      return next();
    };
    if (meetupId) validateParam(meetupId);
    if (userId) validateParam(userId);
    if (questionId) validateParam(questionId);
  }
}

export default ParamsValidator;
