const editMeetupDetails = (meetup) => {
  const token = localStorage.getItem('token');
  const options = {
    method: 'PATCH',
    body: JSON.stringify(meetup),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  return fetch('http://127.0.0.1:8080/api/v1/meetups', options)
    .then(res => res.json())
    .then((res) => {
      if (res.status === 201) {
        setTimeout(() => {
          document.location.reload();
        }, 1000);
      }
      document.querySelector('.error').style.display = 'flex';
      document.querySelector('.error').innerHTML = res.message;
    });
};


const getEditMeetupDetails = () => {
  const formData = new FormData(document.querySelector('#editMeetup'));
  const meetup = {};
  for (const [key, value] of formData.entries()) {
    meetup[key] = value;
  }
  meetup.id = window._selectedMeetup.id;
  editMeetupDetails(meetup);
};
const render = () => {
  const editModal = document.querySelector('#editModal');
  editModal.innerHTML = `<div class="modal-content">
    <div class="modal-header">
      <span class="close"  onclick="closeModal('editModal')">&times;</span>
      <h2>&nbsp;</h2>
    </div>
    <div class="modal-body">
      <div class="create-meetup-form">
        <form class="" id="editMeetup" method="post" enctype="multipart/form-data" autocomplete="on">
          <div class="input-grid">
            <div class="input-div d-flex justify-content-center">
              <input type="text" name="organizerName" id="organizerName" value="${_selectedMeetup.organizer_name}" placeholder="" class="w-100" sze="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <input type="text" name="topic" id="topic" value="${_selectedMeetup.topic}" placeholder="" class="w-100" sie="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <input type="date" name="happeningOn" id="happeningOn" value="${moment(_selectedMeetup.happening_on).format('YYYY-MM-DD')}" placeholder="" class="w-100" sze="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <input type="text" name="location" id="location" value="${_selectedMeetup.location}" placeholder="Tech Zone Park" class="w-100"  sze="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <select class="" name="tags">
                <option value="${_selectedMeetup.tags}" class="text-grey" selected>${_selectedMeetup.tags}</option>
                <option value="" class="text-grey">Choose Tag</option>
                <option value="">Technology</option>
                <option value="">Health</option>
              </select>
            </div>
            <div class="input-div d-flex justify-content-center">
              <button type="button" name="button" class=" btn choose-image-label w-100"><label for="meetupImage"> Choose Image</label></button>
              <input type="file" name="image" value="" id="organizerName" hidden>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-red"  onclick="closeModal('editModal')">Cancel</button>
      <button type="button" class="btn btn-blue"  onclick="getEditMeetupDetails()">Edit</button>
    </div>
  </div>`;
};


const startEdit = (id, meetupId) => {
  window._selectedMeetup = window._meetup.find(meetup => meetup.id === meetupId);
  render();
  launchModal(id);
};
