import Joi from 'joi';

const rsvpMeetupSchema = {
  body: {
    status: Joi.string().lowercase().required(),
  },
  params: {
    id: Joi.number().required(),
  },
};
console.log(rsvpMeetupSchema);
export default rsvpMeetupSchema;
