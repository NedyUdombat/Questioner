import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DB_TEST_URL;
} else {
  connectionString = process.env.DB_URL;
}

console.log("###################", connectionString);

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log('conected');
});
export default {
  query(queries) {
    return new Promise((resolve, reject) => {
      pool.query(queries)
        .then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  },
};
