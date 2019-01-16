import pool from './dbConfig';

class Rsvps {
  static getAllRsvps(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM rsvps WHERE meetup_id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static rsvpMeetup(rsvp, id) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO rsvps ( meetup_id, user_id, response) VALUES (${id}, ${rsvp.userId}, '${rsvp.status}')  returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Rsvps;
