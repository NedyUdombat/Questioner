const render = () => {
  const editModal = document.querySelector('#editModal');
  editModal.innerHTML = `<div class="modal-content">
    <div class="modal-header">
      <span class="close"  onclick="closeModal('editModal')">&times;</span>
      <h2>&nbsp;</h2>
    </div>
    <div class="modal-body">
      <div class="create-meetup-form">
        <form class="">
          <div class="input-grid">
            <div class="input-div d-flex justify-content-center">
              <input type="text" name="meetupName" id="meetupName" value="${_selectedMeetup.organizer_name}" placeholder="" class="w-100" sze="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <input type="text" name="meetupTopic" id="meetupTopic" value="${_selectedMeetup.topic}" placeholder="" class="w-100" sie="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <input type="date" name="meetupDate" id="meetupDate" value="${moment(_selectedMeetup.happening_on).format('YYYY-MM-DD')}" placeholder="" class="w-100" sze="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <input type="text" name="meetupLocation" id="meetupLocation" value="${_selectedMeetup.location}" placeholder="Tech Zone Park" class="w-100"  sze="35">
            </div>
            <div class="input-div d-flex justify-content-center">
              <select class="" name="">
                <option value="${_selectedMeetup.tags}" class="text-grey" selected>${_selectedMeetup.tags}</option>
                <option value="" class="text-grey">Choose Tag</option>
                <option value="">Technology</option>
                <option value="">Health</option>
              </select>
            </div>
            <div class="input-div d-flex justify-content-center">
              <button type="button" name="button" class=" btn choose-image-label w-100"><label for="meetupImage"> Choose Image</label></button>
              <input type="file" name="meetupImage" value="" id="meetupImage" hidden>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-red"  onclick="closeModal('editModal')">Cancel</button>
      <button type="button" class="btn btn-blue">Add</button>
    </div>
  </div>`;
};

const startEdit = (id, meetupId) => {
  window._selectedMeetup = window._meetup.find(meetup => meetup.id === meetupId);
  render();
  launchModal(id);
};
