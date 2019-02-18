window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch('http://127.0.0.1:8080/api/v1/rsvps/user', options)
    .then(res => res.json())
    .then((res) => {
      let output = '';
      if (res.status === 404) {
        output = ` <h1 class="text-center" style="margin-top:20%;"> ${res.message} </h1>`;
        const meetupContainer = document.querySelector('.section');
        meetupContainer.innerHTML = output;
      } else {
        const rsvpAmounts = document.querySelectorAll('.rsvp-amount');
        rsvpAmounts.forEach((rsvpAmount) => {
          const newRsvpAmount = rsvpAmount;
          newRsvpAmount.innerHTML = res.data.length;
        });
        res.data.forEach((meetup) => {
          fetch(`http://127.0.0.1:8080/api/v1/meetups/${meetup.meetup_id}`, options)
            .then(response => response.json())
            .then((response) => {
              output += `<div class="col span_1_of_3">
                <div class="d-flex justify-content-center">
                  <div class="product-card">
                    <a href="single-meetup.html?meetup/${response.data.id}">
                      <div class="card-image-top">
                        <img src="${response.data.image}" alt="empty cart" class="product-image">
                      </div>
                      <div class="product-card-details">
                        <p class="f-20 "> <b>${response.data.topic}</b> </p>
                        <div class="d-flex justify-content-between mt-1">
                          <small class="f-12"><i>${response.data.organizer_name}</i></small>
                          <p class="text-blue">${moment(response.data.happening_on).format('DD MMMM YYYY')}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>`;
              const meetupContainer = document.querySelector('.section');
              meetupContainer.innerHTML = output;
            })
            .catch(error => console.log(error))
        });
      }
    });
});
