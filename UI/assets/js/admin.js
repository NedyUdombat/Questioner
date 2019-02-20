const isAdmin = () => {
  if (localStorage.getItem('id') !== '1') {
    window.location.replace('user-profile.html');
  }
  return true;
};
isAdmin();
