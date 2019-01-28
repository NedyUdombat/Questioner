import pool from '../../database/dbConfig';

class Rsvps {
  static getAllRsvps() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM rsvps')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllRsvpsForMeetup(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM rsvps WHERE meetup_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllRsvpsByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM rsvps WHERE user_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static rsvpMeetup(rsvp) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO rsvps ( meetup_id, user_id, response) VALUES (${rsvp.meetupId}, ${rsvp.userId}, '${rsvp.status}')  returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Rsvps;
