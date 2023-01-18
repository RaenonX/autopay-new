import {createPool} from 'mariadb';

import {MARIA_DB, MARIA_PASSWORD, MARIA_USER} from '../env';


export const dbPool = createPool({
  host: 'localhost',
  user: MARIA_USER,
  database: MARIA_DB,
  password: MARIA_PASSWORD,
  connectionLimit: 5,
});
