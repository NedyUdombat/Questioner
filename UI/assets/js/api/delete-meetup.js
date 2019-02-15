const deleteMeetup = () => {
  const token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch(`http://127.0.0.1:8080/api/v1/meetups/${_selectedMeetupId}`, options)
    .then(res => res.json())
    .then((res) => {
      if (res.status === 200) {
        document.location.reload();
      }
    });
};

const deleteSpecificMeetup = () => {
  deleteMeetup();
};

const startDelete = (id, meetupId) => {
  window._selectedMeetupId = meetupId;
  launchModal(id);
}
