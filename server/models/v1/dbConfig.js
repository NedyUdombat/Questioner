import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'test') {
  console.log(">>>>>>>>>>>>>", process.env.NODE_ENV);
  connectionString = process.env.DB_TEST_URL;
} else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DB_URL;
} else {
  connectionString = process.env.DATABASE_URL;
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
