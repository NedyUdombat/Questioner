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

  static getAllUsersComingForAMeetup(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM rsvps WHERE meetup_id = ${id} AND response = 'yes'`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllRsvpsByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM rsvps WHERE user_id = ${id} AND response = 'yes'`)
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

  static getAllSpecificRsvpByUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM rsvps WHERE meetup_id = ${id.meetupId} AND user_id = ${id.userId}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static changeRsvpMeetup(rsvp, newResponse) {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE rsvps SET response = '${newResponse}' WHERE meetup_id = ${rsvp.meetupId} AND user_id = ${rsvp.userId}   returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Rsvps;
