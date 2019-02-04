
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
    .then(res => res)
    .catch(err => console.log(err));
};


const signUp = () => {
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;
  console.log(password, confirmPassword);

  if (password !== confirmPassword) {
    return alert('passwords do not match!')
  }
  const formData = new FormData(document.querySelector('#signup'));
  const user = {};
  for (const [key, value]  of formData.entries()) {
      user[key] = value;
  }
  // signup(user);
};
