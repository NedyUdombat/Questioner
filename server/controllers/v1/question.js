import questions from '../../models/v1/questions';
import meetups from '../../models/v1/meetups';
import users from '../../models/v1/users';
// import Validator from '../../_helpers/post_validators';


class QuestionController {
  static createQuestion(req, res) {
    const { user, meetup, title, body } = req.body;
    const foundUsername = users.find(aUser => aUser.username === req.body.user);
    const foundMeetup = meetups.find(aMeetup => aMeetup.topic === req.body.meetup);

    if (foundUsername && foundMeetup) {
      const id = questions.length + 1;
      const questionDetail = {
        id, createdBy: user, meetup, title, body, upvotes: 0, downvotes: 0, createdOn: new Date(),
      };
      questions.push(questionDetail);
      const resDetails = {
        userId: foundUsername.id, meetupId: foundMeetup.id, title, body,
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

  static upVote(req, res) {
    const { questionId } = req.params;
    const foundUsername = users.find(aUser => aUser.username === req.body.user);
    const foundQuestion = questions.find(question => question.id === parseInt(questionId, 10));
    if (foundUsername && foundQuestion) {
      const upvotes = foundQuestion.upvotes;
      const totalVote = upvotes + 1;
      foundQuestion.votes = totalVote;

      const resDetail = {
        meetup: foundQuestion.meetup,
        title: foundQuestion.title,
        body: foundQuestion.body,
        upvotes,
        upVote: '+1',
        totalVote,
      };
      return res.status(200).json({
        status: 200,
        message: 'Upvote successful',
        data: resDetail,
      });
    }
    return res.status(404).json({
      error: 'User or Question does not exist',
    });
  }

  static downVote(req, res) {
    const { questionId } = req.params;
    const foundUsername = users.find(aUser => aUser.username === req.body.user);
    const foundQuestion = questions.find(question => question.id === parseInt(questionId, 10));
    if (foundUsername && foundQuestion) {
      const downvotes = foundQuestion.downvotes;
      const totalVote = downvotes - 1;
      foundQuestion.downvotes = totalVote;

      const resDetail = {
        meetup: foundQuestion.meetup,
        title: foundQuestion.title,
        body: foundQuestion.body,
        downvotes,
        downVote: '-1',
        totalVote,
      };
      return res.status(200).json({
        status: 200,
        message: 'Downvote successful',
        data: resDetail,
      });
    }
    return res.status(404).json({
      error: 'User or Question does not exist',
    });
  }
}

export default QuestionController;
