
const login = (user) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  fetch('http://127.0.0.1:8080/api/v1/auth/logout', options)
    .then(response => response.json())
    .then(() => fetch('http://127.0.0.1:8080/api/v1/auth/login', options)
      .then(res => res.json())
      .then((res) => {
        document.querySelector('.error').style.display = 'flex';
        document.querySelector('.error').innerHTML = res.message;
        localStorage.setItem('token', res.jwToken);
        localStorage.setItem('id', res.authDetail.id);
        if (res.authDetail.role === 'admin') {
          window.location.assign('admin.html');
        } else {
          window.location.assign('user-profile.html');
        }
      })
      .catch(err => console.log(err)))
    .catch(err => console.log(err));
};

const loginEvent = (event) => {
  event.preventDefault();
  const formData = new FormData(document.querySelector('#login'));
  const user = {};
  for (const [key, value] of formData.entries()) {
    user[key] = value;
  }

  login(user);
};

document.querySelector('#login').addEventListener('submit', (event) => {
  loginEvent(event);
});
