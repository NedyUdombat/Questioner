import Joi from 'joi';

const createMeetupSchema = {
  body: {
    organizer: Joi.string().required(),
    topic: Joi.string().required(),
    happeningOn: Joi.string().required(),
    location: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    images: Joi.string(),
    isAdmin: Joi.boolean(),
  },
};

export default createMeetupSchema;
