class MeetupValidator {
  static statusValidator(req, res, next) {
    let { status } = req.body;
    status = status.toLowerCase();
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
