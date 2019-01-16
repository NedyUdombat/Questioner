import moment from 'moment';
import pool from './dbConfig';


class Meetups {
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
      images: details.images ? details.images : '{}',
      createdOn: moment().format(),
    };
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO meetups ( organizer_name, topic, location, happening_On, tags, images, created_on) VALUES ('${meetupDetails.organizer_name}', '${meetupDetails.topic}','${meetupDetails.location}', '${meetupDetails.happeningOn}', '${meetupDetails.tags}', '${meetupDetails.images}', '${meetupDetails.createdOn}') returning *`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static deleteAll() {
    return new Promise((resolve, reject) => {
      pool.query('DELETE * FROM meetups')
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static deleteSpecific(id) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE * FROM TABLE WHERE id = ${id}`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }
}

export default Meetups;
