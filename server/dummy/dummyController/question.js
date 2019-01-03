import dummyQuestion from '../dummyModel/dummyQuestion';
import dummyMeetup from '../dummyModel/dummyMeetups';
import dummyUser from '../dummyModel/dummyUser';
import Validator from '../_helpers/post_validators';

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
      const foundUsername = dummyUser.find(user => user.username === req.body.user);
      const foundMeetup = dummyMeetup.find(meetup => meetup.topic === req.body.meetup);

      if (foundUsername && foundMeetup) {
        const id = dummyQuestion.length + 1;
        const userId = foundUsername.id;
        const meetupId = foundMeetup.id;
        let isDuplicate = false;
        for (const question of dummyQuestion) {
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
        dummyQuestion.push(questionDetail);
        const resDetails = {
          userId,
          meetupId,
          title,
          body,
        }
        return res.status(201).json({
          status: 201,
          message: 'Question asked successfully',
          data: resDetails,
        });
      } else {
        return res.status(404).json({
          error: 'User or Meetup does not exist',
        });
      }
    } else {
      return res.status(400).json({
        errorMessages:validator.getErrors()
      });
    }
  }

  static upVote (req, res) {
    const { user } = req.body;
    const fields = {
      user
    }
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      const foundUsername = dummyUser.find(user => user.username === req.body.user);
      const questionId = parseInt(req.params.id, 10);
      const foundQuestion = dummyQuestion.find(question => question.id === questionId, 10);
      if (foundUsername && foundQuestion) {
        let votes = foundQuestion.votes
        if (upcount % 2 !== 0) {
          let totalVote = votes +1;
          foundQuestion.votes = totalVote;
          
          const upVote = '+1'
          const resDetail = {
            meetup: foundQuestion.meetup,
            title: foundQuestion.title,
            body: foundQuestion.body,
            votes,
            upVote,
            totalVote
          }
          upcount += 1;
          return res.status(200).json({
            status:200,
            message: 'Upvote successful',
            data: resDetail,
          })
        } else {
           return res.status(409).json({
            status:409,
            message: 'You can only upvote a question once',
           })
        }
      } else {
        return res.status(404).json({
          error: 'User or Question does not exist',
        });
      }
    } else {
      return res.status(400).json({
        errorMessages:validator.getErrors()
      });
    }
  }

  static downVote (req, res) {
    const { user } = req.body;
    const fields = {
      user
    }
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      const foundUsername = dummyUser.find(user => user.username === req.body.user);
      const questionId = parseInt(req.params.id, 10);
      const foundQuestion = dummyQuestion.find(question => question.id === questionId, 10);
      if (foundUsername && foundQuestion) {
        let votes = foundQuestion.votes
        if (downcount % 2 !== 0) {
          let totalVote = votes -1;
          foundQuestion.votes = totalVote;
          
          const downVote = '-1'
          const resDetail = {
            meetup: foundQuestion.meetup,
            title: foundQuestion.title,
            body: foundQuestion.body,
            votes,
            downVote,
            totalVote
          }
          downcount += 1;
          return res.status(200).json({
            status:200,
            message: 'Downvote successful',
            data: resDetail,
          })
        } else {
           return res.status(409).json({
            status:409,
            message: 'You can only downvote a question once',
           })
        }
      } else {
        return res.status(404).json({
          error: 'User or Question does not exist',
        });
      }
    } else {
      return res.status(400).json({
        errorMessages:validator.getErrors()
      });
    }
  }
}

export default QuestionController;
