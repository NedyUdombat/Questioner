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
      window._meetup = res.data;
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
                  <div class="product-card-footer d-flex justify-content-around align-items-center w-100">
                    <button type="button" name="button" class="btn bg-transparent w-100"><a href="single-meetup.html?meetup/${meetup.id}"><i class="fas fa-eye fa-lg fa-fw"></i> </a></button>
                    <button type="button" name="button" class="btn bg-transparent w-100"><i class="fas fa-edit fa-lg fa-fw text-blue" onclick="startEdit('editModal', ${meetup.id})"></i> </button>
                    <button type="button" name="button" class="btn bg-transparent w-100"><i class="fas fa-trash fa-lg fa-fw text-red" onclick="startDelete ('deleteMeetupModal', ${meetup.id})"></i> </button>
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
