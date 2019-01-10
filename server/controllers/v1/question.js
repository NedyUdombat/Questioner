import questions from '../../models/v1/questions';
import meetups from '../../models/v1/meetups';
import users from '../../models/v1/users';
import Validator from '../../_helpers/post_validators';

let upcount = 1;
let downcount = 1;

class QuestionController {
  static createQuestion(req, res) {
    const { user, meetup, title, body } = req.body;

    const fields = {
      user,
      meetup,
      title,
      body,
    };
    const validator = new Validator();
    validator.validate(fields, 'required|string');

    if (!validator.hasErrors) {
      const foundUsername = users.find(aUser => aUser.username === req.body.user);
      const foundMeetup = meetups.find(aMeetup => aMeetup.topic === req.body.meetup);

      if (foundUsername && foundMeetup) {
        const id = questions.length + 1;
        const userId = foundUsername.id;
        const meetupId = foundMeetup.id;
        let isDuplicate = false;
        for (const question of questions) {
          isDuplicate = question.meetup === fields.meetup && question.title === fields.title && question.body === fields.body;
        }
        if (isDuplicate) {
          return res.status(409).json({ error: `This question '${fields.title}' has already been asked for this meetup` });
        }
        const votes = 0;
        const questionDetail = {
          id,
          user,
          meetup,
          title,
          body,
          votes,
          createdOn: new Date(),
        };
        questions.push(questionDetail);
        const resDetails = {
          userId,
          meetupId,
          title,
          body,
        };
        return res.status(201).json({
          status: 201,
          message: 'Question asked successfully',
          data: resDetails,
        });
      }
      return res.status(404).json({
        error: 'User or Meetup does not exist',
      });
    }
    return res.status(400).json({
      errorMessages: validator.getErrors(),
    });
  }

  static upVote(req, res) {
    const { user } = req.body;
    const fields = {
      user,
    };
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      const foundUsername = users.find(aUser => aUser.username === req.body.user);
      const questionId = parseInt(req.params.id, 10);
      const foundQuestion = questions.find(question => question.id === questionId, 10);
      if (foundUsername && foundQuestion) {
        const votes = foundQuestion.votes;
        if (upcount % 2 !== 0) {
          const totalVote = votes + 1;
          foundQuestion.votes = totalVote;

          const upVote = '+1';
          const resDetail = {
            meetup: foundQuestion.meetup,
            title: foundQuestion.title,
            body: foundQuestion.body,
            votes,
            upVote,
            totalVote,
          };
          upcount += 1;
          return res.status(200).json({
            status: 200,
            message: 'Upvote successful',
            data: resDetail,
          });
        }
        return res.status(409).json({
          status: 409,
          message: 'You can only upvote a question once',
        });
      }
      return res.status(404).json({
        error: 'User or Question does not exist',
      });
    }
    return res.status(400).json({
      errorMessages: validator.getErrors(),
    });
  }

  static downVote(req, res) {
    const { user } = req.body;
    const fields = {
      user,
    };
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      const foundUsername = users.find(aUser => aUser.username === req.body.user);
      const questionId = parseInt(req.params.id, 10);
      const foundQuestion = questions.find(question => question.id === questionId, 10);
      if (foundUsername && foundQuestion) {
        const votes = foundQuestion.votes;
        if (downcount % 2 !== 0) {
          const totalVote = votes - 1;
          foundQuestion.votes = totalVote;

          const downVote = '-1';
          const resDetail = {
            meetup: foundQuestion.meetup,
            title: foundQuestion.title,
            body: foundQuestion.body,
            votes,
            downVote,
            totalVote,
          };
          downcount += 1;
          return res.status(200).json({
            status: 200,
            message: 'Downvote successful',
            data: resDetail,
          });
        }
        return res.status(409).json({
          status: 409,
          message: 'You can only downvote a question once',
        });
      }
      return res.status(404).json({
        error: 'User or Question does not exist',
      });
    }
    return res.status(400).json({
      errorMessages: validator.getErrors(),
    });
  }
}

export default QuestionController;
