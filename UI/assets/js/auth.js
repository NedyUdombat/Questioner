const token = localStorage.getItem('token');
const isLoggedIn = () => {
  if (token) {
    const options = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      }),
    };
    fetch('http://127.0.0.1:8080/api/v1/decode', options)
      .then(res => res.json())
      .then((res) => {
        if (res.name === 'TokenExpiredError') {
          window.location.replace('login.html');
        }
      });
  } else {
    window.location.replace('login.html');
  }
};
isLoggedIn();
