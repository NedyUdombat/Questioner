
const create = (meetup) => {
  const token = localStorage.getItem('token');
  const options = {
    method: 'POST',
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
        }, 2000);
      }
      document.querySelector('.error').style.display = 'flex';
      document.querySelector('.error').innerHTML = res.message;
    });
};

const imageUpload = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'qvfwjbwg');

  const options = {
    method: 'POST',
    body: formData,
  };

  return fetch('https://api.cloudinary.com/v1_1/nedy123/image/upload', options)
    .then(res => res.json())
    .then(res => res.secure_url)
    .catch(err => console.log(err));
};

const createMeetup = (event) => {
  event.preventDefault();
  const image = document.querySelector('#image');
  const uploadedFile = image.files[0];
  imageUpload(uploadedFile)
    .then((res) => {
      const formData = new FormData(document.querySelector('#createMeetup'));
      const meetup = {};
      for (const [key, value] of formData.entries()) {
        meetup[key] = value;
      }
      meetup.image = res;
      create(meetup);
    });
};


document.querySelector('#createMeetup').addEventListener('submit', (event) => {
  createMeetup(event);
});
