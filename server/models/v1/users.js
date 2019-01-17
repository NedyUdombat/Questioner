import pool from './dbConfig';


class Users {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users')
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static getSpecificUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static createAccount(details) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO users ( firstname, lastname, othername, username, email, password, phonenumber, role) VALUES ('${details.firstname}', '${details.lastname}','${details.othername}', '${details.username}', '${details.email}', '${details.password}', '${details.phonenumber}', 'user') returning *`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static deleteAll() {
    return new Promise((resolve, reject) => {
      pool.query('DELETE * FROM users')
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static deleteSpecific(id) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE * FROM users WHERE id = ${id}`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }
}

export default Users;
