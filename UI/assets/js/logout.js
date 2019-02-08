const logout = () => {
  fetch('http://127.0.0.1:8080/api/v1/auth/logout')
    .then(response => response.json())
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      window.location.replace('login.html');
    })
    .catch(err => console.log(err));
  // console.log("logout");
};

const logoutButton = () => {
  // document.querySelector('#logoutForm').addEventListener('submit', () => {
    logout();
  // });
  // console.log("logout");

}
