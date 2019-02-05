
const signup = (user) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  return fetch('http://127.0.0.1:8080/api/v1/auth/signup', options)
    .then(res => res.json())
    .then((res) => {
      document.querySelector('.error').style.display = 'flex';
      document.querySelector('.error').innerHTML = res.message;
      localStorage.setItem('token', res.data.jwToken);
      localStorage.setItem('id', res.data.authDetail.id);
      window.location.replace('meetups.html');
    })
    .catch(err => console.log(err));
};

const signUp = (event) => {
  event.preventDefault();
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  if (password !== confirmPassword) {
    document.querySelector('.error').style.display = 'flex';
    document.querySelector('.error').innerHTML = 'passwords do not match!';
    return;
  }
  const formData = new FormData(document.querySelector('#signup'));
  const user = {};
  for (const [key, value] of formData.entries()) {
    user[key] = value;
  }

  signup(user);
};

document.querySelector('#signup').addEventListener('submit', (event) => {
  signUp(event);
});
