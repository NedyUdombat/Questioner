let meetupId = document.location.search.split('meetup/')[1];
meetupId = Number(meetupId);


const launchToast = (msg, state) => {
  const toastDiv = document.querySelector('#toast');
  if (state === 'cancel') {
    toastDiv.innerHTML = `<div id="img"> <i class="fas fa-times ${state}"></i> </div><div id="desc">${msg}</div>`;
  } else {
    toastDiv.innerHTML = `<div id="img"> <i class="fas fa-check ${state}"></i> </div><div id="desc">${msg}</div>`;
  }
  toastDiv.className = 'show';
  setTimeout(() => {
    toastDiv.className = toastDiv.className.replace('show', '');
  }, 3000);
};

const rsvp = () => {
  const rsvpIcon = document.querySelector('.fa-calendar-check');
  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch(`http://127.0.0.1:8080/api/v1/meetups/${meetupId}/rsvp`, options)
    .then(res => res.json())
    .then((res) => {
      if (res.data.response === 'yes') {
        rsvpIcon.classList.remove('text-grey');
        rsvpIcon.classList.add('rsvp-blue');
        document.querySelector('.rsvp-tooltip-text').innerHTML = 'Click here to cancel';
        launchToast(res.message, 'success');
      } else {
        rsvpIcon.classList.add('text-grey');
        rsvpIcon.classList.remove('rsvp-blue');
        document.querySelector('.rsvp-tooltip-text').innerHTML = 'Click here to rsvp';
        launchToast(res.message, 'cancel');
      }
    });
};
