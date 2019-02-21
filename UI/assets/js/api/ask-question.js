const userId = localStorage.getItem('id');
const askQuestionFetch = (question) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(question),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch('http://127.0.0.1:8080/api/v1/questions', options)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      // return;
      if (res.status === 201) {
        document.location.reload();
      } else {
        document.querySelector('.error').style.display = 'flex';
        document.querySelector('.error').innerHTML = 'Please fill all fields';
      }
    });
};

const askQuestion = (event) => {
  event.preventDefault();
  const formData = new FormData(document.querySelector('#askQuestion'));
  const questionFormData = {};
  for (const [key, value] of formData.entries()) {
    questionFormData[key] = value;
  }
  const question = {
    meetupId: _selectedMeetupId,
    userId,
    title: questionFormData.title,
    body: questionFormData.body,
  };
  askQuestionFetch(question);
};

document.querySelector('#askQuestion').addEventListener('submit', (event) => {
  askQuestion(event);
});

const startAskQuestion = (id, meetupId) => {
  window._selectedMeetupId = meetupId;
  launchModal(id);
};
