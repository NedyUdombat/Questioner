window.addEventListener('load', () => {
  let meetupId = document.location.search.split('meetup/')[1];
  meetupId = Number(meetupId);
  console.log(meetupId);

  const token = localStorage.getItem('token');
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
      console.log(res);
      const output = `<div class="single-meetup-card">
          <div class="w-100">
            <div class="card-header">
              <div class="d-flex justify-content-center">
                <img src="assets/images/meetup1.jfif" alt="Meetup Image" class="meetup-image">
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
              <button type="button" class="btn bg-transparent pl-0 tooltip question-btn" onclick="launchModal('askQuestionModal')">
                <i class="fas fa-plus f-32 text-grey"></i>
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
});
