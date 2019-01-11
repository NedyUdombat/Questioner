class MeetupValidator {
  static statusValidator(req, res, next) {
    const { status } = req.body;
    const rsvpStatus = status === 'yes' || status === 'no' || status === 'maybe';
    if (!rsvpStatus) {
      return res.status(400).json({
        error: 'Rsvp should be yes, no, or maybe',
      });
    }
    return next();
  }
}

export default MeetupValidator;
