import moment from 'moment';
import pool from '../../database/dbConfig';


class Meetup {
  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM meetups')
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static getSpecific(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM meetups WHERE id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getUpcoming() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM meetups WHERE happening_on > to_date('${moment().format('YYYY-MM-DD')}', 'YYYY MM DD')`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static create(details) {
    const newHappeningOn = moment(details.happeningOn).format('YYYY-MM-DD');
    const meetupDetails = {
      organizer_name: details.organizerName,
      topic: details.topic,
      location: details.location,
      happeningOn: newHappeningOn,
      tags: details.tags ? details.tags : '{}',
      image: details.image ? details.image : '',
      createdOn: moment().format(),
    };
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO meetups ( organizer_name, topic, location, happening_On, tags, image, created_on) VALUES ('${meetupDetails.organizer_name}', '${meetupDetails.topic}','${meetupDetails.location}', '${meetupDetails.happeningOn}', '${meetupDetails.tags}', '${meetupDetails.image}', '${meetupDetails.createdOn}') returning *`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static editMeetup(details, id) {
    const meetupDetails = {
      organizer_name: details.organizerName,
      topic: details.topic,
      location: details.location,
      happeningOn: moment(details.happeningOn).format('YYYY-MM-DD'),
      tags: details.tags ? details.tags : '{}',
      image: details.image ? details.image : '',
    };
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE meetups SET topic = '${meetupDetails.topic}', location = '${meetupDetails.location}', happening_On = '${meetupDetails.happeningOn}', tags = '${meetupDetails.tags}', organizer_name = '${meetupDetails.organizer_name}', image = '${meetupDetails.image}'  WHERE id = ${id} returning *`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }


  static deleteSpecific(id) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM meetups WHERE id = ${id}`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static deleteAllMeetups() {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM meetups')
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }
}

export default Meetup;
