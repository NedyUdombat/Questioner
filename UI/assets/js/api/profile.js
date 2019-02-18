window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  };
  fetch('http://127.0.0.1:8080/api/v1/user', options)
    .then(res => res.json())
    .then((res) => {
      const output = `<table id="profile-table" class="w100">
        <thead>
          <tr>
            <th colspan="2" > My Profile </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>${res.data.firstname}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>${res.data.lastname}</td>
          </tr>
          <tr>
            <td>Other Name</td>
            <td>${res.data.othername}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>@${res.data.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${res.data.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>0${res.data.phonenumber}</td>
          </tr>
        </tbody>
      </table>`;
      const meetupContainer = document.querySelector('#profile');
      meetupContainer.innerHTML = output;
    });
});
