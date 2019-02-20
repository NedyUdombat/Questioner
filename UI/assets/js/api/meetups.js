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
  fetch('http://127.0.0.1:8080/api/v1/meetups', options)
    .then(res => res.json())
    .then((res) => {
      let output = '';
      res.data.forEach((meetup) => {
        output += `<div class="col span_1_of_3">
            <div class="d-flex justify-content-center">
              <div class="product-card">
                <a href="single-meetup.html?meetup/${meetup.id}">
                  <div class="card-image-top">
                    <img src="${meetup.image}" alt="empty cart" class="product-image">
                  </div>
                  <div class="product-card-details">
                    <p class="f-20 "> <b>${meetup.topic}</b> </p>
                    <div class="d-flex justify-content-between mt-1">
                      <small class="f-12"><i>${meetup.organizer_name}</i></small>
                      <p class="text-blue">${moment(meetup.happening_on).format('DD MMMM YYYY')}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>`;
        const meetupContainer = document.querySelector('.section');
        meetupContainer.innerHTML = output;
      });
    });
});
