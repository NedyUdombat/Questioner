const isAdmin = () => {
  if (localStorage.getItem('id') === 1) {
    return true;
  }
  window.location.replace('user-profile.html');
};
isAdmin();
