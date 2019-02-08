const isLoggedIn = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  window.location.replace('login.html');
};
isLoggedIn();
