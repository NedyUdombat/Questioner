window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  let meetupId = document.location.search.split('meetup/')[1];
  meetupId = Number(meetupId);

  singleMeetup();
});

const singleMeetup = async () => {
  try {
    await getSingleMeetupDetails();
    await checkIfMeetupIsRsvpedByUser();
    await getSingleMeetupQuestions();
  } catch (error) {
    console.log(error);
  }
};

const getSingleMeetupDetails = () => {
  const options = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch(`http://127.0.0.1:8080/api/v1/meetups/${meetupId}`, options)
    .then(res => res.json())
    .then((res) => {
      const output = `<div class="single-meetup-card">
          <div class="w-100">
            <div class="card-header">
              <div class="d-flex justify-content-center">
                <img src="${res.data.image}" alt="Meetup Image" class="meetup-image">
              </div>
              <div class="d-block">
                <p class="f-24">${res.data.topic}</p>
                <p>${res.data.organizer_name}</p>
                <p class="text-blue date">${moment(res.data.happening_on).format('DD MMMM YYYY')}</p>
                <div class="d-flex tags ">
                  <div class=" d-flex">
                    <div class="tag edu">
                      ${res.data.tags}
                    </div>
                    <div class="tag health">
                      health
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex ">
                <p class="d-flex"> <span class="text-blue">Location: </span>&nbsp;&nbsp;</p>
                <p>${res.data.location}</p>
              </div>
            </div>
            <div class="card-footer ">
              <button type="button" class="btn bg-transparent pl-0 tooltip question-btn">
                <i class="fas fa-plus f-32 text-grey"  onclick="startAskQuestion('askQuestionModal', ${res.data.id})"></i>
                <span class="tooltiptext">Click here to ask</span>
              </button>

              <button type="button" class="btn bg-transparent tooltip rsvp-btn" onclick="rsvp()">
                <i class="far fa-calendar-check text-grey f-32"></i>
                <span class="tooltiptext rsvp-tooltip-text">Click here to rsvp</span>
              </button>
            </div>
          </div>
        </div>`;
        const meetupContainer = document.querySelector('.single-meetup-div');
        meetupContainer.innerHTML = output;
    });
}

const checkIfMeetupIsRsvpedByUser = () => {
  const options = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  setTimeout(() => {
    const rsvpIcon = document.querySelector('.fa-calendar-check');
    fetch(`http://127.0.0.1:8080/api/v1/${meetupId}/rsvp/user/`, options)
    .then(res => res.json())
    .then((res) => {
      if (res.data.response === 'yes') {
        rsvpIcon.classList.remove('text-grey');
        rsvpIcon.classList.add('rsvp-blue');
        document.querySelector('.rsvp-tooltip-text').innerHTML = 'Click here to cancel';
      } else {
        rsvpIcon.classList.add('text-grey');
        rsvpIcon.classList.remove('rsvp-blue');
        document.querySelector('.rsvp-tooltip-text').innerHTML = 'Click here to rsvp';
      }
    });
  }, 2000)
}

const getSingleMeetupQuestions = () => {
  const options = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch(`http://127.0.0.1:8080/api/v1/${meetupId}/questions`, options)
    .then(res => res.json())
    .then((res) => {
      let output ='';
      if (res.status !== 200 ) {
        output = `<div class="d-flex justify-content-center ">
          <h1>No Questions Asked yet ...<h1>
        </div>`;
        const meetupContainer = document.querySelector('.question-content');
        meetupContainer.innerHTML = output;
      } else {
        document.querySelector('.question-amount').innerHTML = `${res.amount}`;
        res.data.forEach((question) => {
          fetch(`http://127.0.0.1:8080/api/v1/user/${question.user_id}`, options)
            .then(response => response.json())
            .then((response) => {
              output += `<div class="question-card">
                <div class="card-header details">
                  <div class="d-flex">
                    <img src="assets/images/placeholder.png" alt="Meetup Image" class="profile-image">
                    <div class="">
                      <p>${response.data.firstname} ${response.data.lastname}</p>
                      <p class="f-14 text-grey">@${response.data.username}</p>
                    </div>
                  </div>
                  <div class="">
                    <p class="f-14 text-grey time-posted">Asked : ${moment(question.created_on, 'YYYYMMDD').fromNow()} &nbsp; ${question.id}</p>
                  </div>
                </div>
                <div class="card-body question">
                  <p>Question: ${question.body}</p>
                </div>
                <div class="card-footer actions">
                  <div class="w-45 inner-footer  h-100 d-flex justify-content-between align-items-center">
                    <div class="d-flex  w-100 justify-content-center ">
                      <button type="button" class="btn bg-transparent p-0 d-flex mr-3" onclick="vote('upvote', ${question.id})">
                        <i class="fas fa-chevron-up rsvp-blue f-28 mr-3"></i>
                      </button>
                    </div>
                    <div class="d-flex w-100 justify-content-center ">
                      <span class="amount">${question.vote_amount}</span>
                    </div>
                    <div class="d-flex w-100 justify-content-center ">
                      <button type="button" class="btn bg-transparent p-0 d-flex mr-3" onclick="vote('downvote', ${question.id})">
                        <i class="fas fa-chevron-down text-red f-28 mr-3"></i>
                      </button>
                    </div>
                    <div class="d-flex w-100 justify-content-center ">
                      <button type="button" class="btn bg-transparent p-0 d-flex mr-3" onclick="comment(${question.id});">
                        <i class="fas fa-comment f-24"></i>
                      </button>
                    </div>

                  </div>
                </div>
                <div class="bg-white d-none comment-div">
                  <form>
                    <div class="d-flex justify-content-center ">
                      <textarea class="w-100" rows="5" maxlength="300" name="question" placeholder="Type your comment here (300 characters max)"></textarea>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button type="submit" class="btn btn-blue">comment</button>
                    </div>
                  </form>
                </div>
              </div>`
              const meetupContainer = document.querySelector('.question-content');
              meetupContainer.innerHTML = output;
              // fetch(`http://127.0.0.1:8080/api/v1/${question.id}/comments`, options)
              // .then(comments => comments.json())
              // .then(comments => {
              //   console.log(comments);
              //
              // })
            })
        });
      }
    });
}



const vote = (voteType, id) => {
  const options = {
    method: 'PATCH',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch(`http://127.0.0.1:8080/api/v1/questions/${id}/${voteType}`, options)
    .then(res => res.json())
    .then((res) => {
      if (res.status === 409) {
        alert(res.message);
      } else {
        document.location.reload();
      }
    })
}
